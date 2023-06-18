export class IParams {
  [key: string]: any;

  codigo?: string;
  descricao?: string;
  direction: string = 'asc';
  pageNumber: number = 0;
  pageSize: number = 10;
  pesquisa?: string;
  sort: string = 'id';
  status?: string;
}

export function toUrlParams(filter: any){
  let urlParams = '';

  console.log(filter)
  Object.keys(filter).forEach((key: string) => {
    const value: any = filter[key];

    if (value !== undefined && value !== null && value !== '' && !['direction', 'pageNumber', 'pageSize', 'sort'].includes(key)) {
      urlParams += `&${key}=${encodeURIComponent(value)}`;
    }
  });

  return urlParams;
}
