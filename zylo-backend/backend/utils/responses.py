"""Responses.py"""
from utils.enums import ResponseStatus
from django.http import JsonResponse

class Response():
    """Response class"""
    @staticmethod
    def construct_error_response(status_code, exception):
        """error response"""
        status_type = ResponseStatus.FAILED.value
        status_message = exception
        data = None

        return Response.construct_response(status_type, status_message, status_code, data)

    @staticmethod
    def construct_success_response(status_code, data=None, msg='Request Successful'):
        """success response"""
        return Response.construct_response(ResponseStatus.SUCCESS.value, msg, status_code, data)

    @staticmethod
    def construct_response(status_type, status_message, status_code, data):
        """response"""
        return JsonResponse({
            "status": {
                "status_type": status_type,
                "status_message": status_message,
                "status_code": status_code
            },
            "data": data
        }, status=status_code)
