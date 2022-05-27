import { useCallback, useEffect, useState } from 'react';

export type ProjectItem = {
  id: number;
  title: string;
};

export type SelectedProjectItemMap = Record<number, boolean>;

const MOCK_COUNT = 10;

const mockProjectItems: ProjectItem[] = new Array(MOCK_COUNT).fill(null).map((_, index) => ({
  id: index,
  title: `Project ${index}`,
}));

const mockSelectedProjectMap: SelectedProjectItemMap = new Array(MOCK_COUNT)
  .fill(null)
  .map((_, index) => index)
  .reduce((acc, cur) => ({ ...acc, [cur]: false }), {});

export const useGetProjectItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [selectedProjectMap, setSelectedProjectMap] = useState<SelectedProjectItemMap>({});

  useEffect(() => {
    (async () => {
      // TODO: 추후에 api 통해서 서버에 project items 받아와야함
      // 지금은 아직 api 가 없어서 api 요청 후 1초 뒤에 온다고 생각하고 setTimeout 으로 지정함
      setIsLoading(true);
      setTimeout(() => {
        setProjectItems(mockProjectItems);
        setSelectedProjectMap(mockSelectedProjectMap);
        setIsLoading(false);
      }, 1000);
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
