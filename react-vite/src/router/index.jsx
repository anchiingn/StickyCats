import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllStickers from '../components/Stickers/AllStickers/AllStickers';
import StickerDetail from '../components/Stickers/StickerDetail/StickerDetail';
import CurrentStickers from '../components/Stickers/CurrentStickers/CurrentStickers';
import NewSticker from '../components/Stickers/NewSticker/NewSticker';
import EditSticker from '../components/Stickers/EditSticker/EditSticker';
import AllFavoriteStickers from '../components/Favorites/AllFavoriteStickers/AllFavoriteStickers';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllStickers />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stickers/:id",
        element: <StickerDetail />
      },
      {
        path: "my-stickers",
        element: <CurrentStickers />
      },
      {
        path: "new-sticker",
        element: <NewSticker />
      },
      {
        path: "edit-sticker",
        element: <EditSticker />
      },
      {
        path: "my-favorite-stickers",
        element: <AllFavoriteStickers />
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>
      }
    ],
  },
]);