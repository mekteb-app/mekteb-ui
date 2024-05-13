import { Nivo as NivoEnum } from "@/enums/nivo";

interface Props {
  nivo: NivoEnum;
}

const Nivo = ({ nivo }: Props) => (
  <>
    <div className="relative h-4 w-full max-w-[120px] rounded-full bg-stroke">
      <div
        className={`absolute left-0 flex h-full items-center justify-center rounded-full bg-primary`}
        style={{ width: `${nivo ? 120 / (5 / +nivo) : 0}px` }}
      >
        <p className="my-auto text-center text-[10px] font-bold leading-none text-white">
          {nivo}
        </p>
      </div>
    </div>
  </>
);

export default Nivo;
