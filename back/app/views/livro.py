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

from unidecode import unidecode
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
def getBooksOfFilters(request):
    order = request.GET.get("order")
    max_price = request.GET.get("maxPrice")

    livros = Livro.objects.all()

    if max_price:
        livros = livros.filter(price__lte=max_price)

    if len(livros) == 0:
        return Response({"message": "Nenhum livro encontrado!"}, status=404)

    if order == "1":
        livros = sorted(livros, key=lambda livro: livro.vendas, reverse=True)

    if order == "2":
        livros = sorted(livros, key=lambda livro: livro.price)

    if order == "3":
        livros = sorted(livros, key=lambda livro: livro.price, reverse=True)

    if order == "4":
        livros = reversed(livros)
    
    data = []
    for livro in livros:
        livro_data = {
            'id': livro.id,
            'title': livro.title,
            'price': livro.price,
            'stock': livro.stock,
            'isbn': livro.isbn,
            'author': livro.author,
            'genre': livro.genre.all(),
            'capa': livro.capa,
            'desconto': livro.desconto,
            'vendas': livro.vendas, 
        }
        data.append(livro_data)


    serializer = LivroSerializer(data, many=True)
    return Response(serializer.data, status=200)

@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def searchBooks(request):
    text = request.GET.get("text")

    text = text.lower()

    text = unidecode(text)

    livros = []

    for livro in Livro.objects.all():
        if text in unidecode(livro.title.lower()):
            livros.append(livro)

    for livro in Livro.objects.all():
        if text in unidecode(livro.author.name.lower()):
            livros.append(livro)

    for livro in Livro.objects.all():
        for genre in livro.genre.all():
            if text in unidecode(genre.name.lower()):
                livros.append(livro)

    livros = list(set(livros))

    if len(livros) == 0:
        return Response({"message": "Nenhum livro encontrado!"}, status=404)
    
    data = []
    for livro in livros:
        livro_data = {
            'id': livro.id,
            'title': livro.title,
            'price': livro.price,
            'stock': livro.stock,
            'isbn': livro.isbn,
            'author': livro.author,
            'genre': livro.genre.all(),
            'capa': livro.capa,
            'desconto': livro.desconto,
            'vendas': livro.vendas,
        }
        data.append(livro_data)

    serializer = LivroSerializer(data, many=True)
    return Response(serializer.data, status=200)

@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def getBooksToSlides(request):
    type = request.GET.get("type")

    print(request)

    livros = Livro.objects.all()

    if type == "news":
        livros = Livro.objects.all()[::-1][:20]

    if type == "50off":
        livros = Livro.objects.filter(desconto=50)[:20]

    if type == "bestPrice":
        livros = Livro.objects.all().order_by('price')[:20]

    if type == "trending":
        livros = Livro.objects.all().order_by('-vendas')[:20]

    if type == "bestSellers":
        livros = Livro.objects.all().order_by('-vendas')[:10]

    data = []
    for livro in livros:
        livro_data = {
            'id': livro.id,
            'title': livro.title,
            'price': livro.price,
            'stock': livro.stock,
            'isbn': livro.isbn,
            'author': livro.author,
            'genre': livro.genre.all(),
            'capa': livro.capa,
            'desconto': livro.desconto,
            'vendas': livro.vendas,
        }
        data.append(livro_data)

    serializer = LivroSerializer(data, many=True)
    return Response(serializer.data, status=200)