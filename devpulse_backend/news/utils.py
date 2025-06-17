import requests
from datetime import datetime,timezone
from .models import Article
from.models import Repo
import praw
import feedparser
from django.conf import settings
from newspaper import Article as NewsArticle
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

import requests
from bs4 import BeautifulSoup
from prawcore.exceptions import Forbidden,NotFound
from django.utils.timezone import make_aware



defaultList=[
  "javascript",
  "python",
  "java",
  "typescript",
  "react",
  "vue",
  "angular",
  "nodejs",
  "express",
  "django",
  "flask",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "graphql",
  "rest",
  "css",
  "html",
  "webpack",
  "babel",
  "flutter",
  "swift",
  "android",
  "ios",
  "mongodb",
  "postgresql",
  "sql",
  "devops",
  "machinelearning",
  "ai",
  "blockchain",
  "security",
  "testing",
  "cicd"
]

def fetch_devto_articles(tags=None):
    if tags is None:
        tags=defaultList
    
    for tag in tags:
        url = f"https://dev.to/api/articles?tag={tag}"
        response = requests.get(url)
        if response.status_code != 200:
            print("Erreur API dev.to:", response.status_code)
            return []

        articles_data = response.json()
        articles = []
        for item in articles_data:
            article, created = Article.objects.get_or_create(
                url=item['url'],
                defaults={
                    'title': item['title'],
                    'source': 'dev-to',
                    'language': tag,
                    'summary': item.get('description') or '',
                    'published_at': datetime.strptime(item['published_at'], '%Y-%m-%dT%H:%M:%SZ'),
                }
            )
            if created:
                articles.append(article)

    return articles




def fetch_reddit_posts(subreddit_name=None, limit=10):
    reddit = praw.Reddit(
    client_id=settings.REDDIT_CLIENT_ID,
    client_secret=settings.REDDIT_CLIENT_SECRET,
    user_agent=settings.REDDIT_USER_AGENT

    )
    
    if subreddit_name is None:
        subreddit_name=defaultList
    for name in subreddit_name:
        try:
            subreddit=reddit.subreddit(name)
            subreddit.id
            posts = subreddit.new(limit=limit)
        except (Forbidden,NotFound):
            print(f"Accès interdit au subreddit '{name}', saut du subreddit.")
            continue  # passe au suivant sans planter la fonction
        except Exception as e:
            print(f"Erreur inattendue avec le subreddit '{name}': {e}")
            continue
        
        for post in posts:
            try:
       
                if not Article.objects.filter(url=post.url).exists():
                    text_to_summarize = post.selftext or post.title
                    summary = text_to_summarize[:300] + '...' if text_to_summarize else 'No summary available'

                    Article.objects.create(
                        title=post.title,
                        url=post.url,
                        source='Reddit',
                        language=name,
                        published_at = make_aware(datetime.fromtimestamp(post.created_utc), timezone.utc),
                        summary=summary,
                    
                )
            
            except Exception as e:
                    print(f"Erreur pour {post.url}: {e}")
                    continue

                    



def fetch_hackernews_articles(keywords=None, limit=10):
    if keywords is None:
        keywords=defaultList
    top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    story_ids = requests.get(top_stories_url).json()[:limit]

    for story_id in story_ids:
        story_url = f'https://hacker-news.firebaseio.com/v0/item/{story_id}.json'
        story = requests.get(story_url).json()

        for keyword in keywords:
                url = story['url']
                try:
                    article=NewsArticle(url)
                    article.download()
                    article.parse()
                    full_text = article.text

                    parser = PlaintextParser.from_string(full_text, Tokenizer("english"))
                    summarizer = LsaSummarizer()
                    summary_sentences = summarizer(parser.document, 3)  
                    summary = " ".join(str(sentence) for sentence in summary_sentences)

                except Exception as e:
                    print(f"Erreur pour {url}: {e}")


          
                if not Article.objects.filter(url=story['url']).exists():
                    Article.objects.create(
                        title=story['title'],
                        url=story['url'],
                        source='HackerNews',
                        language=keyword,
                        published_at=make_aware(datetime.fromtimestamp(story['time'])),
                        summary=summary
                        
                    )
                  
        
def fetch_medium_articles(tags=None, limit=10):
    import nltk
    nltk.download('punkt_tab')
   
    if tags is None:
        tags = defaultList

    for tag in tags:
        url = f'https://medium.com/feed/tag/{tag}'
        feed = feedparser.parse(url)
        
        for entry in feed.entries[:limit]:
            url=entry.link
            try:
                article = NewsArticle(url)
                article.download()
                article.parse()
                text = article.text

                parser = PlaintextParser.from_string(text, Tokenizer("english"))
                summarizer = LsaSummarizer()
                summary_sentences = summarizer(parser.document, 3)
                summary = " ".join(str(sentence) for sentence in summary_sentences)
               
            

            except Exception as e:
                print(f"Erreur pour {url}: {e}")


           

            if not Article.objects.filter(url=entry.link).exists():
                Article.objects.create(
                    
                    title = entry.title.strip()[:200] if entry.title else 'No Title',
                    url=entry.link,
                    source='Medium',
                    language=tag,
                    published_at=datetime(*entry.published_parsed[:6]) if hasattr(entry, 'published_parsed') else datetime.now(),
                    summary=summary
                   
                )


def fetch_github_repo():
    url = "https://github.com/trending"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
       

        for repo in soup.select("article.Box-row")[:10]:
            title_tag = repo.h2.a
            full_name = title_tag.get_text(strip=True).replace('\n', '').replace(' ', '')
            href = "https://github.com" + title_tag['href']
            description_tag = repo.p
            description = description_tag.get_text(strip=True) if description_tag else "Pas de description."


            if not Repo.objects.filter(url=href).exists():

                Repo.objects.create(
                    title=full_name,
                    url=href,
                    summary=description
                )

    except Exception as e:
      print(f"Erreur pour {url}: {e}")





def purge():
    Article.objects.all().delete()
    Repo.objects.all().delete()
   
    




def getAll():
    fetch_github_repo()
    fetch_devto_articles()
    fetch_reddit_posts()
    fetch_hackernews_articles()
    fetch_medium_articles()
    fetch_github_repo()
    