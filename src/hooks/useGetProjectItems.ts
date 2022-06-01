import { ProjectApi, ProjectItem, SelectedProjectItemMap } from 'api/ProjectApi';
import { useCallback, useEffect, useState } from 'react';

export const useGetProjectItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [selectedProjectMap, setSelectedProjectMap] = useState<SelectedProjectItemMap>({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await ProjectApi.getProjects();
        setProjectItems(res.data.projectItems);
        setSelectedProjectMap(res.data.selectedProjectMap);
      } catch {
        // TODO: 에러 처리
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: true }));
  }, []);

  const removeSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: false }));
  }, []);

  return {
    isLoading,
    projectItems,
    selectedProjectMap,
    addSelected,
    removeSelected,
  };
};
