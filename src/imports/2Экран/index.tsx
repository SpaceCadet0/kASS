function Frame2() {
  return <div className="absolute left-0 size-px top-0" />;
}

function InputField() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative rounded-[10px] shrink-0 w-[392px]" data-name="Input field">
      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px relative text-[#252422] text-[16px]">
        <p className="leading-[1.25]">{`https;//admin.lime-it.ru/`}</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Адрес сервера</p>
      </div>
      <InputField />
    </div>
  );
}

function InputField1() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative rounded-[10px] shrink-0 w-[392px]" data-name="Input field">
      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px relative text-[#252422] text-[16px]" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        <p className="leading-[1.25]">ds@lime-it.ru</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Телефон/Почта</p>
      </div>
      <InputField1 />
    </div>
  );
}

function Steps() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Steps">
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
      <div className="bg-[#303030] relative rounded-[8px] shrink-0 size-[8px]" data-name="Indicator" />
    </div>
  );
}

function InputField2() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative rounded-[10px] shrink-0 w-[392px]" data-name="Input field">
      <Steps />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Пароль</p>
      </div>
      <InputField2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[98px] top-[188px] w-[392px]">
      <Input />
      <Input1 />
      <Input2 />
    </div>
  );
}

function ButtonPrimary() {
  return (
    <div className="absolute bg-[#47d465] content-stretch flex h-[56px] items-center justify-center left-[98px] px-[152px] py-[17px] rounded-[10px] top-[506px] w-[392px]" data-name="Button / primary">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[1.25]">Войти в систему</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white h-[615px] left-[422px] rounded-[10px] top-[173px] w-[596px]" data-name="авторизация">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Raleway:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-3.5px)] text-[#2b2b2b] text-[24px] text-center top-[56px] whitespace-nowrap">Вход в систему</p>
      <Frame3 />
      <ButtonPrimary />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#5ae277] content-stretch flex items-center justify-center left-0 overflow-clip px-[38px] py-[16px] rounded-[8px] top-[4px] w-[191px]">
      <p className="[word-break:break-word] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[14px] text-white whitespace-nowrap" style={{ fontFeatureSettings: '"lnum", "pnum"' }}>
        По паролю
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[rgba(90,226,119,0)] content-stretch flex items-center justify-center left-[195px] opacity-45 overflow-clip px-[28px] py-[16px] rounded-[8px] top-[4px] w-[195px]">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">По пин-коду</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f9f9f9] h-[57px] left-[calc(50%-4px)] overflow-clip rounded-[10px] top-[280px] w-[392px]" data-name="Component 4">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-[#f6f6f6] relative size-full" data-name="2 экран">
      <Frame2 />
      <Component />
      <Component2 />
    </div>
  );
}