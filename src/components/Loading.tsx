import ReactLoading from 'react-loading';

interface LoadingProps {
  color?: string;
  width: string;
  height: string;
}

export const Loading = ({ color = '#42F8EA', width, height }: LoadingProps) => (
  <ReactLoading type="spin" color={color} height={height} width={width} />
);
