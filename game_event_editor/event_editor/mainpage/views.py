from django.shortcuts import render
from django.http import JsonResponse
from .models import Event
import json
from datetime import datetime
from django.views import View
from django.conf import settings 
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseNotFound
from django.db.utils import IntegrityError

# Function-based view to return JSON data
def event_list(request):
    events = Event.objects.all()
    event_data = []
    
    for event in events:
        event_data.append({
            'event_id': event.event_id,
            'config_id': event.config_id,
            'apply_area': event.apply_area,
            'apply_player': event.apply_player,
            'event_type': event.event_type,
            'start_time': event.start_time.strftime('%Y-%m-%d %H:%M:%S'),
            'end_time': event.end_time.strftime('%Y-%m-%d %H:%M:%S'),
            'cfg_data': event.cfg_data,
        })
    
    return JsonResponse(event_data, safe=False)

class ModifyRecordView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)  # Parse the JSON body
            event_id = data['event_id']
            config_id = data['config_id']
            apply_area = data['apply_area']
            apply_player = data['apply_player']
            config_data = data['config_data']

            # Fields that might be missing and need default values
            event_type = data.get('event_type', 'Default Type')
            start_time = data.get('start_time', datetime.now())
            end_time = data.get('end_time', datetime.now())

            try:# Create the event in the database
                Event.objects.create(
                    event_id=event_id,
                    config_id=config_id,
                    apply_area=apply_area,
                    apply_player=apply_player,
                    event_type=event_type,
                    start_time=start_time,
                    end_time=end_time,
                    cfg_data=config_data
                )
            except IntegrityError:
                return JsonResponse({'status': 'error', 'message': 'Event with this ID already exists'}, status=400)

            return JsonResponse({'message': 'Record added successfully', 'data': data}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    def put(self, request, *args, **kwargs):
        data = json.loads(request.body)
        event_id = data.get('event_id')
        
        try:
            event = Event.objects.get(event_id=event_id)
            for field, value in data.items():
                setattr(event, field, value)
            event.save()
            return JsonResponse({'status': 'modified', 'event_id': event.event_id})
        except Event.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Event not found'}, status=404)

    def delete(self, request, *args, **kwargs):
        try:
            event_id = request.GET.get('id')  # Get the event_id from the URL if provided
            if not event_id:
                return JsonResponse({'error': 'No event_id provided'}, status=400)
            event = Event.objects.get(event_id=event_id)
            event.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)

        except Event.DoesNotExist:
            return HttpResponseNotFound({'error': 'Record not found'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)



    def options(self, request, *args, **kwargs):
        response = JsonResponse({}, status=200)
        origin = request.headers.get('Origin')

        if origin in settings.CORS_ALLOWED_ORIGINS or settings.CORS_ALLOW_ALL_ORIGINS:
            response["Access-Control-Allow-Origin"] = origin
        else:
            response["Access-Control-Allow-Origin"] = ""
        
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"  # Allow the methods needed for this endpoint
        response["Access-Control-Allow-Headers"] = "Content-Type" 
        response["Access-Control-Allow-Credentials"] = "true" # Allow specific headers
        return response
        # return JsonResponse({}, status=200)


