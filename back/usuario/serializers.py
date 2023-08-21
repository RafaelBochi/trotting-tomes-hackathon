from rest_framework.serializers import ModelSerializer, SlugRelatedField

from .models import Usuario, ProfileImage


class UsuarioSerializer(ModelSerializer):

    class Meta:
        model = Usuario
        fields = "__all__"

class ProfileImageSerializer(ModelSerializer):

    class Meta:
        model = ProfileImage
        fields = "__all__"
