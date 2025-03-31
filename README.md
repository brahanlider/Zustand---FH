# React + TypeScript + Vite + Zustand + TailwindCSS + ReactRouterDom

Este es un cascarón de proyecto, siéntete libre de usarlo para tus proyectos.

<img src="https://github.com/Klerith/zustand-mini-curso/blob/main/public/screenshot.png?raw=true" alt="Dashboard Screenshot">

## Instalar

1. Clonar proyecto
2. Instalar dependencias `npm install`
3. Correr en desarrollo `npm run dev`

- Agregar docker-compose.yaml

- .env=>

```bash
APP_VERSION=0.0.1

STAGE=prod

DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=TesloDB
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32s
```

---

LUEGO =>

4. Correr en desarrollo `docker compose up -d`

email=test1@google.com
password=Abc123

# Zustand 🐻🐼

## Métodos y Utilidades Clave

Zustand es una librería de manejo de estado para React que ofrece una API minimalista pero poderosa.

create y StateCreator
El núcleo de Zustand es la función create que genera un hook de store. StateCreator es un tipo que define la forma del store:

```bash
import { create, StateCreator } from 'zustand';

type BearState = {
  bears: number;
  increase: () => void;
};

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

## Middlewares: devtools y persist

Zustand ofrece middlewares para extender funcionalidad:

devtools: Integración con Redux DevTools

persist: Persistencia del estado en localStorage

```bash
const useStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      { name: 'bear-storage' }
    )
  )
);
```

## createJSONStorage y StateStorage

Para personalizar cómo se persiste el estado:

```bash
import { createJSONStorage } from 'zustand/middleware';

const storage = createJSONStorage(() => sessionStorage);
// Usar con persist:
persist(..., { storage })
```

## useShallow

Optimiza renders cuando solo necesitas partes superficiales del estado:

```bash
import { useShallow } from 'zustand/react/shallow';

const { bears } = useBearStore(
  useShallow((state) => ({ bears: state.bears }))
);
```

## StoreMutatorIdentifier e interceptors

Para tipos avanzados y modificación del store:

```bash
#  Para extender tipos con middlewares
type MyStore = Mutate<StoreApi<BearState>, [["zustand/devtools", never]]>;

// Interceptors permiten modificar set/update
const store = create<BearState>()(
  ((set) => ({
    bears: 0,
    increase: () => set(
      (state) => ({ bears: state.bears + 1 }),
      false,
      'increase'
    ),
  })),
  (fn) => (args) => {
    console.log('Interceptando:', args);
    return fn(args);
  }
);
```
