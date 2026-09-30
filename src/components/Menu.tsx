import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { calculatorOutline, gridOutline, languageOutline, personOutline, videocamOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Presentación',
    url: '/inicio',
    icon: personOutline
  },
  {
    title: 'Sumadora',
    url: '/sumadora',
    icon: calculatorOutline
  },
  {
    title: 'Números en letras',
    url: '/numeros-letras',
    icon: languageOutline
  },
  {
    title: 'Tabla de multiplicar',
    url: '/tabla',
    icon: gridOutline
  },
  {
    title: 'Mi experiencia',
    url: '/experiencia',
    icon: videocamOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Tarea 3</IonListHeader>
          <IonNote>Explorando IONIC o React con un Proyecto Creativo</IonNote>
          {appPages.map((appPage) => {
            return (
              <IonMenuToggle key={appPage.url} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
