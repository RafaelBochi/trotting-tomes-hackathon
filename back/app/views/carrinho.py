from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import (
    api_view,
)
from rest_framework.response import Response
from app.models import Carrinho
from app.serializers import CarrinhoSerializer

class CarrinhoViewSet(ModelViewSet):
    queryset = Carrinho.objects.all()
    serializer_class = CarrinhoSerializer

@api_view(["GET"])
def get_cart_user(request):
    user_id = request.GET.get('user')

    carrinho = Carrinho.objects.filter(user=user_id)

    serializer = CarrinhoSerializer(carrinho, many=True)

    return Response(serializer.data)
