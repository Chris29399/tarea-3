import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { calculatorOutline, gridOutline, languageOutline, personOutline, videocamOutline } from 'ionicons/icons';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Page.css';

const pageDetails = {
  inicio: { title: 'Página Inicial', icon: personOutline},
  sumadora: { title: 'Sumadora', icon: calculatorOutline},
  'numeros-letras': { title: 'Números en letras', icon: languageOutline},
  tabla: { title: 'Tabla de multiplicar', icon: gridOutline},
  experiencia: { title: 'Mi experiencia', icon: videocamOutline},
};

const numberWords = [
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
  'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés',
  'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
];

const tensWords = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const hundredsWords = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const numberToLetters = (value: number): string => {
  if (value === 1000) return 'mil';
  if (value < 30) return numberWords[value];
  if (value < 100) {
    const tens = Math.floor(value / 10);
    const units = value % 10;
    return units === 0 ? tensWords[tens] : `${tensWords[tens]} y ${numberWords[units]}`;
  }
  if (value === 100) return 'cien';

  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;
  return remainder === 0 ? hundredsWords[hundreds] : `${hundredsWords[hundreds]} ${numberToLetters(remainder)}`;
};

const ProfilePage: React.FC = () => (
  <IonCard className="profile-sheet">
    <IonCardContent className="profile-layout">
      <div className="photo-placeholder" aria-label="Foto 2x2">
        <img src="resources\profile_picture.jpeg" alt="Foto 2x2" />
      </div>
      <div className="profile-details">
        <IonCardHeader className="profile-header">
          <IonCardSubtitle>Datos personales</IonCardSubtitle>
          <IonCardTitle>Cristopher Tomas Linares Peguero</IonCardTitle>
        </IonCardHeader>
        <IonList className="profile-data" lines="inset">
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonText>Cristopher Tomas</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonText>Linares Peguero</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonText>ctlp29399@gmail.com</IonText>
          </IonItem>
        </IonList>
      </div>
    </IonCardContent>
  </IonCard>
);

const AdditionPage: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const addNumbers = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const first = Number(firstNumber);
    const second = Number(secondNumber);
    if (!firstNumber.trim() || !secondNumber.trim() || !Number.isFinite(first) || !Number.isFinite(second)) {
      setError('Ingresa dos números válidos.');
      setResult(null);
      return;
    }
    setError('');
    setResult(first + second);
  };

  return (
    <IonCard className="tool-panel">
      <IonCardContent>
        <form onSubmit={addNumbers}>
          <IonGrid className="input-pair">
            <IonRow>
              <IonCol size="12" sizeSm="5"><IonInput className="number-input" type="number" inputmode="decimal" label="Primer número" labelPlacement="stacked" placeholder="0" value={firstNumber} onIonInput={(event) => setFirstNumber(event.detail.value ?? '')} /></IonCol>
              <IonCol className="operator-column" size="12" sizeSm="2"><span className="operator-sign" aria-hidden="true">+</span></IonCol>
              <IonCol size="12" sizeSm="5"><IonInput className="number-input" type="number" inputmode="decimal" label="Segundo número" labelPlacement="stacked" placeholder="0" value={secondNumber} onIonInput={(event) => setSecondNumber(event.detail.value ?? '')} /></IonCol>
            </IonRow>
          </IonGrid>
          <IonButton className="action-button" type="submit" expand="block">Sumar números</IonButton>
        </form>
        {error && <IonText className="form-error" color="danger" role="alert">{error}</IonText>}
        {result !== null && <IonItem className="result-panel" lines="none" aria-live="polite"><IonLabel><IonCardSubtitle>Resultado</IonCardSubtitle><IonText className="result-value">{result.toLocaleString('es')}</IonText></IonLabel></IonItem>}
      </IonCardContent>
    </IonCard>
  );
};

const NumberWordsPage: React.FC = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const translateNumber = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(number);
    if (!number.trim() || !Number.isInteger(value) || value < 1 || value > 1000) {
      setError('El número debe ser un entero entre 1 y 1000.');
      setResult('');
      return;
    }
    setError('');
    setResult(numberToLetters(value));
  };

  return (
    <IonCard className="tool-panel">
      <IonCardContent>
        <form onSubmit={translateNumber}>
          <IonInput className="number-input" type="number" inputmode="numeric" min="1" max="1000" step="1" label="Número entero" labelPlacement="stacked" placeholder="Ej. 248" value={number} onIonInput={(event) => setNumber(event.detail.value ?? '')} />
          <IonButton className="action-button" type="submit" expand="block">Convertir a letras</IonButton>
        </form>
        {error && <IonText className="form-error" color="danger" role="alert">{error}</IonText>}
        {result && <IonItem className="result-panel word-result" lines="none" aria-live="polite"><IonLabel><IonCardSubtitle>{number} en letras</IonCardSubtitle><IonText className="result-value">{result}</IonText></IonLabel></IonItem>}
      </IonCardContent>
    </IonCard>
  );
};

const MultiplicationPage: React.FC = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const showTable = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = Number(number);
    if (!number.trim() || !Number.isFinite(value)) {
      setError('Ingresa un número válido.');
      setResult(null);
      return;
    }
    setError('');
    setResult(value);
  };

  return (
    <IonCard className="tool-panel">
      <IonCardContent>
        <form onSubmit={showTable}>
          <IonInput className="number-input" type="number" inputmode="decimal" label="Número" labelPlacement="stacked" placeholder="Ej. 7" value={number} onIonInput={(event) => setNumber(event.detail.value ?? '')} />
          <IonButton className="action-button" type="submit" expand="block">Mostrar tabla</IonButton>
        </form>
        {error && <IonText className="form-error" color="danger" role="alert">{error}</IonText>}
        {result !== null && (
          <IonList className="multiplication-table" aria-label={`Tabla de multiplicar del ${result}`}>
            {Array.from({ length: 13 }, (_, index) => index + 1).map((multiplier) => (
              <IonItem key={multiplier}>
                <IonLabel>{result} × {multiplier}</IonLabel>
                <IonText slot="end">= {result * multiplier}</IonText>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
};

const getYoutubeVideoId = (value: string): string | null => {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, '');
    let videoId = '';
    if (host === 'youtu.be') {
      videoId = url.pathname.slice(1).split('/')[0];
    } else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      videoId = url.searchParams.get('v') ?? url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] ?? '';
    }
    return /^[\w-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
};

const youtubeExperienceUrl = '';

const ExperiencePage: React.FC = () => {
  const videoId = getYoutubeVideoId(youtubeExperienceUrl);

  return (
    <IonCard className="experience-panel">
      <IonCardContent>
        <div className="video-frame">
          {videoId ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title="Mi experiencia al realizar esta tarea" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          ) : (
            <div className="video-placeholder"><IonIcon icon={videocamOutline} aria-hidden="true" /></div>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

const Page: React.FC = () => {
  const { name = '' } = useParams<{ name: string; }>();
  const currentPage = pageDetails[name as keyof typeof pageDetails] ?? pageDetails.inicio;

  let content;
  switch (name) {
    case 'sumadora': content = <AdditionPage />; break;
    case 'numeros-letras': content = <NumberWordsPage />; break;
    case 'tabla': content = <MultiplicationPage />; break;
    case 'experiencia': content = <ExperiencePage />; break;
    default: content = <ProfilePage />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{currentPage.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="workspace-content">
        <main className="page-shell">
          <div className="page-heading">
            <h1>{currentPage.title}</h1>
          </div>
          {content}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Page;
