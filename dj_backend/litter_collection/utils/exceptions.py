from rest_framework.views import expection_handler


def custom_expcetion_handler(exc, context):

    response = exception_handler(exc, context)


    if response is not None:
        response.data['status_code'] = response.status_code

    
    return response