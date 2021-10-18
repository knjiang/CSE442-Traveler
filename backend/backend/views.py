from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response

class GetCSRFTokenView(APIView):
    """
    View to get csrf token
    """

    def get(self, request, format=None):
        """
        Return CSRF token.
        """
        return Response({
            "csrfToken": get_token(request)
        })