from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny  

from app.models import Images
from app.serializers import ImagesSerializer

class ImagesViewSet(ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer

    permission_classes = [AllowAny]
