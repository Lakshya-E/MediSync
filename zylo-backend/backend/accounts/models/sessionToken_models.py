from django.contrib.sessions.models import Session
from django.db import models
from django.conf import settings
import binascii
import os
# from lib.modelMixins import ClmVersioningMixin, ClmVersioningManager
# from lib.customFields import VersionField
class SessionToken(models.Model):
    # objects = ClmVersioningManager()
    # version = VersionField()
    key = models.CharField(("Key"), max_length=40, primary_key=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='session_auth_token',
        on_delete=models.CASCADE, verbose_name=("User")
    )
    created = models.DateTimeField(("Created"), auto_now_add=True)
    key_name = models.CharField(max_length=40, null=True, blank=True)

    class Meta:
        # abstract = 'sessionauthtoken' not in settings.INSTALLED_APPS
        verbose_name = ("Token")
        verbose_name_plural = ("Tokens")

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key
