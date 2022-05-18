export interface ListItem {
  id: number;
  title: string;
  check: boolean;
}

interface SubscribeListProps {
  showChecked: boolean;
  subscribeList: ListItem[];
  onClickListItem: (itemId: number) => void;
}

export const SubscribeList = ({ showChecked, subscribeList, onClickListItem }: SubscribeListProps) => (
  <div>
    {subscribeList
      .filter(item => (showChecked ? item.check : !item.check))
      .map(item => (
        <div key={item.id}>
          <button type="button" onClick={() => onClickListItem(item.id)}>
            {item.check ? 'CHECKED' : 'CHECK'}
          </button>
          <p>{item.title}</p>
        </div>
      ))}
  </div>
);
