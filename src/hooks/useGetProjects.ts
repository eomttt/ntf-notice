import { ProjectApi, ProjectItem, SelectedProjectItemMap } from 'api/ProjectApi';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

export const useGetProjects = () => {
  const { data, error } = useSWR('/projects', () => ProjectApi.getProjects());

  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [selectedProjectMap, setSelectedProjectMap] = useState<SelectedProjectItemMap>({});

  useEffect(() => {
    setProjectItems(data?.data?.projectItems || []);
  }, [data?.data?.projectItems]);

  useEffect(() => {
    setSelectedProjectMap(data?.data?.selectedProjectMap || {});
  }, [data?.data?.selectedProjectMap]);

  const addSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: true }));
  }, []);

  const removeSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: false }));
  }, []);

  return {
    error,
    isLoading: !data && !error,
    projectItems,
    selectedProjectMap,
    addSelected,
    removeSelected,
  };
};
