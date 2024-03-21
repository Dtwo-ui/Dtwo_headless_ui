import ReactDom from 'react-dom/client';
import { VAR1, Com1 } from './home';

const root = document.querySelector('#root')!;
export const Test = ({ text }: { text: string }) => (
  <div>
    {text} {VAR1}
    <Com1 />
  </div>
);
export const ROOT = ReactDom.createRoot(root);
export type Test = { hoho: HO };
type HO = string;
