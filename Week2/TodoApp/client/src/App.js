import { Frame } from '@shopify/polaris';

import TopBarExample from './components/TopBarExample';
import PageTodo from "./pages/PageTodo";

function App() {
  const logo = {
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    width: 86,
    url: '#',
    accessibilityLabel: 'Shopify',
  };

  return (
    <Frame
    logo={logo}
    topBar={<TopBarExample/>}
    >
      <PageTodo/>
    </Frame> 
  );
}

export default App;