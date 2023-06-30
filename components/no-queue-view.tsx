import * as React from "react";

import Image from "next/image";

export default function NoQueueView() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <Image
        src="/black_logo.png"
        alt="Petpal Asia"
        width={252}
        height={85}
        className="h-[85px] w-[252px]"
      />
      <h2 className="font-bold text-[32px] leading-[51.2px]">
        No pet owners on queue
      </h2>
      <p className="text-xl text-muted">
        We&apos;ll notify you once there are pet owners to be checked.
      </p>
    </div>
  );
}
