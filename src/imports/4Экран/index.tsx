function Frame2() {
  return <div className="absolute left-0 size-px top-0" />;
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Парк аттракционов</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame3 />
    </div>
  );
}

function ButtonPrimary() {
  return (
    <div className="bg-[#f9f9f9] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame10 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
        <div className="absolute inset-[20.83%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <circle cx="7" cy="7" fill="var(--fill-0, #47D465)" id="Ellipse 7" r="7" />
          </svg>
        </div>
      </button>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Тестовая касса</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame4 />
    </div>
  );
}

function ButtonPrimary1() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame11 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-[315px]" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25] whitespace-pre-wrap">{`Аквапарки,  термы для презентаций`}</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame5 />
    </div>
  );
}

function ButtonPrimary2() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame13 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Активитти</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame6 />
    </div>
  );
}

function ButtonPrimary3() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame15 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Кидбург</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame7 />
    </div>
  );
}

function ButtonPrimary4() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame17 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary4 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Кидбург</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame20 />
    </div>
  );
}

function ButtonPrimary5() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame19 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary5 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[201px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] w-full" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">Кидбург</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex items-center left-[62px] top-[18px]">
      <Frame23 />
    </div>
  );
}

function ButtonPrimary6() {
  return (
    <div className="bg-[rgba(249,249,249,0.09)] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Button / primary">
      <Frame22 />
      <button className="absolute block cursor-pointer left-[16px] size-[24px] top-[16px]" data-name="Component 5">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Ellipse 5" r="11.5" stroke="var(--stroke-0, #47D465)" />
        </svg>
      </button>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <ButtonPrimary6 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start left-[50px] top-[106px] w-[498px]">
      <Frame8 />
      <Frame9 />
      <Frame12 />
      <Frame14 />
      <Frame16 />
      <Frame18 />
      <Frame21 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.25]">Ок</p>
      </div>
    </div>
  );
}

function ButtonPrimary8() {
  return (
    <div className="absolute bg-white h-[56px] left-0 rounded-[10px] top-0 w-[220px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[152px] py-[17px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function ButtonPrimary7() {
  return (
    <div className="absolute bg-white h-[56px] left-[72px] top-[10px] w-[218px]" data-name="Button / primary">
      <ButtonPrimary8 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[1.25]">Отмена</p>
      </div>
    </div>
  );
}

function ButtonPrimary9() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[56px] left-[304px] rounded-[10px] top-[10px] w-[220px]" data-name="Button / primary">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[152px] py-[17px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-white h-[99px] left-0 top-[516px] w-[596px]">
      <ButtonPrimary7 />
      <ButtonPrimary9 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute h-[393px] left-[565px] top-[107px] w-0" data-name="Скролл">
      <div className="absolute inset-[-0.25%_-1px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.00003 395">
          <g id="Ð¡ÐºÑÐ¾Ð»Ð»">
            <path d="M1.00003 1L1.00001 394" id="Line 8" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeWidth="2" />
            <path d="M1.00001 1L1 313" id="Line 9" stroke="var(--stroke-0, #47D465)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white h-[615px] left-[422px] rounded-[10px] top-[173px] w-[596px]" data-name="авторизация">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Raleway:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-102px)] text-[#2b2b2b] text-[24px] text-center top-[50px] whitespace-pre">{`Выберите  инсталляцию`}</p>
      <Frame24 />
      <Frame25 />
      <Component1 />
    </div>
  );
}

export default function Component2() {
  return (
    <div className="bg-[#f6f6f6] relative size-full" data-name="4 экран">
      <Frame2 />
      <Component />
    </div>
  );
}