from rest_framework.viewsets import ModelViewSet
from app.models import CarrinhoLivro
from app.serializers import CarrinhoLivroSerializer, CarrinhoLivroSerializerCreate
from rest_framework.viewsets import ModelViewSet
from config.decorators import jwt_optional
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response

class CarrinhoLivroViewSet(ModelViewSet):
    queryset = CarrinhoLivro.objects.all()
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return CarrinhoLivroSerializer
        return CarrinhoLivroSerializerCreate
    
@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def getBookCartOfUser(request):
    user_id = request.GET.get("user_id")
    if user_id:
        bookCart = CarrinhoLivro.objects.filter(user_id=user_id)
        serializer = CarrinhoLivroSerializer(bookCart, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "Please provide a valid user_id parameter."}, status=400)