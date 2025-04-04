import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../store";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  // const { blackBears, increaseBlackBears } = useBearStore((state) => state);
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
};
export const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  const bears = useBearStore(useShallow((state) => state.bears));
  // const bears = useBearStore((state) => state.bears);
  const doNothing = useBearStore((state) => state.doNothing);
  const addBears = useBearStore((state) => state.addBears);
  const cleanBears = useBearStore((state) => state.cleanBears);

  // console.log(bears);
  return (
    <>
      <WhiteCard centered className="space-y-2">
        <h1>oso</h1>
        <button onClick={doNothing}>Do Nothing</button>
        <button onClick={addBears}>Add Bears</button>
        <button onClick={cleanBears}>Clean Bears</button>

        <pre>{JSON.stringify(bears, null, 2)}</pre>
      </WhiteCard>
    </>
  );
};
