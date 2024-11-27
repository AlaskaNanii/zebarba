import { Injectable } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private gapi: any;
  private CLIENT_ID = '45331705306-tmf9e8v7losga7j79r18gmdta8mkjarb.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCHY_xYQq-tDCkkGq2QsJvRYGN1E2sTliYY';
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  constructor() {
    this.initializeGapi();
  }

  async initializeGapi() {
    await loadGapiInsideDOM();
    this.gapi = (window as any).gapi;
    this.gapi.load('client:auth2', async () => {
      await this.gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: this.SCOPES,
      });
    });
  }

  async signIn() {
    const authInstance = this.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }
  }

  async createEvent(event: any) {
    await this.signIn();
    try {
      const response = await this.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('Event created:', response);
      return response.result;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }
}


