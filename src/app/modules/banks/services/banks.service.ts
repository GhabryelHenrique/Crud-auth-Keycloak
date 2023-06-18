import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Content, IBank } from '../models/bank.model';
import { IParams, toUrlParams } from '../models/iParams.model';

@Injectable({
  providedIn: 'root',
})
export class BanksService {
  apiURL = environment.baseApiURL;

  constructor(private http: HttpClient) {}

  createBank(createForm: any): Observable<IBank>{
    return this.http.post<IBank>(`${this.apiURL}/v1/bancos`, createForm);

  }

  getBanks(params: IParams): Observable<Content<IBank>> {
    const mergedParams: IParams = {
      direction: params?.direction || new IParams().direction,
      pageNumber: params?.pageNumber || new IParams().pageNumber,
      pageSize: params?.pageSize || new IParams().pageSize,
      sort: params?.sort || new IParams().sort,
    };

    return this.http.get<Content<IBank>>(
      `${this.apiURL}/v1/bancos?direction=${mergedParams.direction}&pageNumber=${mergedParams.pageNumber}&pageSize=${mergedParams.pageSize}&sort=${mergedParams.sort}` +
        toUrlParams(params ? params : {})
    );
  }

  getBankById(id: string): Observable<IBank> {
    return this.http.get<IBank>(`${this.apiURL}/v1/bancos/${id}`);
  }

  editBank(id: number, editForm: any): Observable<IBank> {
    return this.http.put<IBank>(`${this.apiURL}/v1/bancos/${id}`, editForm);
  }

  deleteBank(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/v1/bancos/${id}`);
  }

  deleteListBanks(cfopMap: any): Observable<any> {
    const options = {
      body: cfopMap,
    };
    return this.http.delete<any>(`${this.apiURL}/v1/bancos/listIds`, options);
  }
}
