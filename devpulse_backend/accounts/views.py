from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.mail import send_mail
from .models import MagicLinkToken
from datetime import timedelta
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponseRedirect



class SendMagicLinkView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email required"}, status=400)
        
        try:
            validate_email(email)
        except ValidationError:
            return Response({"error": "Adresse email invalide"}, status=status.HTTP_400_BAD_REQUEST)

        try:
          user = User.objects.get(email=email)
        except User.DoesNotExist:
            
            user,created=User.objects.get_or_create(email=email)
            if created:
                    return Response({"message": "User successfully created"}, status=201)
            
            else:
                return Response({"error": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST)
            

        # Créer le token
        token_obj = MagicLinkToken.objects.create(
            user=user,
            expires_at=timezone.now() + timedelta(minutes=15)
        )
        magic_link = f"http://localhost:5000/api/auth/magiclink/verify/?token={token_obj.token}"
        send_mail(
            "Connexion to CodeGlyph",
            f"Clic here to login : {magic_link}",
            "no-reply@codeglyph.eu",
            [email],
            fail_silently=False,
        )

        return Response({"message": "Magic Link sent"})
    


class VerifyMagicLinkView(APIView):
    def get(self, request):
        token = request.query_params.get("token")
        if not token:
            return Response({"error": "Token requis"}, status=400)

        try:
            token_obj = MagicLinkToken.objects.get(token=token)
        except MagicLinkToken.DoesNotExist:
            return Response({"error": "Token invalide"}, status=404)

        if token_obj.is_expired():
            return Response({"error": "Lien expiré"}, status=401)

        # Supprimer le token après usage
        user = token_obj.user
        token_obj.delete()

        # Générer un JWT
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)


        redirect_url = f"http://localhost:3000/login-success?access={access_token}&refresh={refresh_token}"
        return HttpResponseRedirect(redirect_url)

    