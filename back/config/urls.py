
from django.contrib import admin
from django.urls import path, include
from usuario.router import router as usuario_router
from rest_framework.routers import DefaultRouter
from app.views import LivroViewSet, AutorViewSet, GeneroViewSet, CarrinhoViewSet, CarrinhoLivroViewSet, CompraViewSet, CompraLivroViewSet
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r"livros", LivroViewSet)
router.register(r"autores", AutorViewSet)
router.register(r"generos", GeneroViewSet)
router.register(r"carrinhos", CarrinhoViewSet)
router.register(r"carrinhoLivros", CarrinhoLivroViewSet)
router.register(r"compras", CompraViewSet)
router.register(r"compraLivros", CompraLivroViewSet)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from usuario.views import login, register, forget_password, change_password
from app.views.livro import getBooksOfFilters, searchBooks

urlpatterns = [
    path("api/", include(usuario_router.urls)),
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('api/login/', login, name='login'),
    path('api/register/', register, name='register'),
    path('api/forget_password/', forget_password, name='forget_password'),
    path('api/change_password/', change_password, name='change_password'),
    path('api/get_books_of_filters/', getBooksOfFilters, name='getBooksOfFilters'),
    path('api/search_books/', searchBooks, name='searchBooks'),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
