from rest_framework.authentication import TokenAuthentication
from .models.sessionToken_models import SessionToken


class SessionTokenAuthentication(TokenAuthentication):
    """
    Simple session token based authentication.
        Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
    """
    model = SessionToken
