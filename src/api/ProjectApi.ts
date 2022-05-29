import { BaseApi } from 'api/BaseApi';

export type ProjectItem = {
  id: number;
  name: string;
};

export type SelectedProjectItemMap = Record<number, boolean>;

export class ProjectApi extends BaseApi {
  static getProjects() {
    return this.http.get<{
      projectItems: ProjectItem[];
      selectedProjectMap: SelectedProjectItemMap;
    }>(`${this.url}/projects`);
  }

  static subscribeProjects(data: { email: string; projectIds: number[]; optionProjects: string[] }) {
    return this.http.post(`${this.url}/projects/subscribe`, data);
  }
}
