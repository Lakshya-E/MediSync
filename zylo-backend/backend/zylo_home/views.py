from django.http import JsonResponse

# Example view
def home_view(request):
    data = {
        "message": "Welcome to the Home Page!"
    }
    return JsonResponse(data)
