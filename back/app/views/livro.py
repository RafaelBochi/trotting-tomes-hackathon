from django.http import HttpRequest
from django.conf import settings
from django.urls import reverse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from config.decorators import jwt_optional
from rest_framework.permissions import AllowAny
from app.models import Livro
from app.serializers import LivroSerializer

from rest_framework.permissions import BasePermission
from rest_framework.parsers import MultiPartParser, FormParser
class LivroViewSet(ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(image=self.request.data.get('capa'))

    def perform_update(self, serializer):
        capa = self.request.data.get('capa')
        if capa:
            serializer.save(capa=capa)
        else:
            serializer.save()
    
    @classmethod
    @jwt_optional
    def as_view(cls, actions=None, **kwargs):
        return super().as_view(actions, **kwargs)

    def get_permissions(self):
        """
        Retorna a lista de permissões permitidas para a visualização.
        """
        if self.request.method == 'GET':
            return [AllowAny()]  # Permite qualquer usuário para requisições GET
        return super().get_permissions()
    
    
@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def getBooksOfGenres(request):
    genres_id = request.GET.getlist("genres[]")
    if len(genres_id) == 0:
        return Response({"message": "Nenhum gênero informado!"}, status=400)
    
    livros = Livro.objects.filter(genre__in=genres_id).distinct()

    if len(livros) == 0:
        return Response({"message": "Nenhum livro encontrado!"}, status=404)
    
    data = []
    for livro in livros:
        capa_url = request.build_absolute_uri(settings.MEDIA_URL + str(livro.capa))
        livro_data = {
            'id': livro.id,
            'title': livro.title,
            'price': livro.price,
            'stock': livro.stock,
            'isbn': livro.isbn,
            'author': livro.author,
            'genre': livro.genre.all(),
            'capa': livro.capa,
        }
        data.append(livro_data)

    serializer = LivroSerializer(data, many=True)
    return Response(serializer.data, status=200)