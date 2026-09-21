import svgPaths from "./svg-oq1vimi72f";
type Component5Props = {
  className?: string;
  property1?: "Rectangle 221";
};

function Component5({ className, property1 = "Rectangle 221" }: Component5Props) {
  return (
    <div className={className || "relative size-[20px]"}>
      <div className="absolute bg-white border border-[#47d465] border-solid inset-0 rounded-[4px]" />
    </div>
  );
}

function Frame3() {
  return <div className="absolute left-0 size-px top-0" />;
}

function Group1() {
  return (
    <div className="absolute inset-[1.46%_29.4%_95.64%_29.17%]">
      <svg className="absolute block inset-0 size-full" fill="none" height="29.8308" preserveAspectRatio="none" viewBox="0 0 29.8306 29.8308" width="29.8306">
        <g id="Group 7386">
          <path clipRule="evenodd" d={svgPaths.p36063100} fill="#F980FF" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1d689192} fill="#4DD0FF" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p1db0600} fill="#F95B1C" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p30cc4f00} fill="#47D465" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Settings() {
  return (
    <div className="absolute left-[26px] size-[24px] top-[855px]" data-name="settings">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g clipPath="url(#clip0_0_171)" id="settings">
          <path d={svgPaths.p3cccb600} id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3737f500} id="Vector_2" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_171">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function UserPlus() {
  return (
    <div className="absolute right-[13px] size-[24px] top-[12px]" data-name="user-plus">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="user-plus">
          <path d={svgPaths.p3f80dc40} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1280af80} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 8V14" id="Vector_3" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M23 11H17" id="Vector_4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[#2b2b2b] h-[48px] left-[11px] rounded-[10px] top-[91px] w-[50px]">
      <UserPlus />
    </div>
  );
}

function LogOut() {
  return (
    <div className="absolute left-[26px] size-[24px] top-[961px]" data-name="log-out">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="log-out">
          <path d={svgPaths.p29914600} id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 17L21 12L16 7" id="Vector_2" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 12H9" id="Vector_3" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MessageCircle() {
  return (
    <div className="absolute left-[26px] size-[24px] top-[908px]" data-name="message-circle">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="message-circle">
          <path d={svgPaths.p1edfde00} id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white h-[1028px] left-px overflow-clip top-0 w-[72px]">
      <Group1 />
      <Settings />
      <Frame6 />
      <LogOut />
      <MessageCircle />
    </div>
  );
}

function Component01AlignCenter() {
  return (
    <div className="absolute bottom-0 left-1/4 right-[24.29%] top-[0.07%]" data-name="01 align center">
      <svg className="absolute block inset-0 size-full" fill="none" height="19.9858" preserveAspectRatio="none" viewBox="0 0 10.1428 19.9858" width="10.1428">
        <g id="01 align center">
          <path d={svgPaths.p19491700} fill="#303030" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px opacity-50 relative text-[#252422] text-[16px]">
            <p className="leading-[1.25]">Введите имя/фамилию гостя</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25]">Обращение</span>
          <span className="leading-[1.25] text-[#f95b1c]">*</span>
        </p>
      </div>
      <InputField />
    </div>
  );
}

function InputField2() {
  return (
    <div className="bg-[#47d465] content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[18px] relative rounded-[33px] shrink-0" data-name="Input field">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-end leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        <p className="leading-[1.25]">Подтвердить</p>
      </div>
    </div>
  );
}

function InputField1() {
  return (
    <div className="bg-[#f9f9f9] h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px relative text-[#252422] text-[16px]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
            <p className="leading-[1.25]">8 912 345 67 88</p>
          </div>
          <InputField2 />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[507px]" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25]">Номер телефона</span>
          <span className="leading-[1.25] text-[#f95b1c]">*</span>
        </p>
      </div>
      <InputField1 />
    </div>
  );
}

function InputField3() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px relative text-[#252422] text-[16px]">
            <p className="leading-[1.25]">DS@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[80px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25]">E-mail</span>
          <span className="leading-[1.25] text-[#f95b1c]">*</span>
        </p>
      </div>
      <InputField3 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[35px] top-[187px] w-[507px]">
      <Input />
      <Input1 />
      <Input2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(71,212,101,0.19)] h-[28px] relative shrink-0 w-full">
      <div className="-translate-y-full [word-break:break-word] absolute flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] left-[4px] text-[#252422] text-[16px] top-[24px] w-[755px]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        <p className="leading-[1.25]">Взрослая</p>
      </div>
    </div>
  );
}

function Component01AlignCenter1() {
  return (
    <div className="absolute inset-[22.05%_30.48%_22.05%_39.17%]" data-name="01 align center">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.414" preserveAspectRatio="none" viewBox="0 0 7.28556 13.414" width="7.28556">
        <g id="01 align center">
          <path d={svgPaths.p3b290f00} fill="#252422" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Component01AlignCenter2() {
  return (
    <div className="absolute inset-[22.05%_30.48%_22.05%_39.17%]" data-name="01 align center">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.414" preserveAspectRatio="none" viewBox="0 0 7.28556 13.414" width="7.28556">
        <g id="01 align center">
          <path d={svgPaths.p3b290f00} fill="#252422" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputField4() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[16px] py-[18px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-full opacity-50 relative shrink-0 text-[#252422] text-[16px] w-[min-content]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          <p className="leading-[1.25]">Выбрать категорию</p>
        </div>
        <Frame7 />
        <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-full relative shrink-0 text-[#252422] text-[16px] w-[min-content]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          <p className="leading-[1.25]">Детская</p>
        </div>
        <div className="absolute flex items-center justify-center left-[747px] size-[24px] top-[10px]">
          <div className="-scale-y-100 flex-none rotate-90">
            <div className="overflow-clip relative size-[24px]" data-name="fi-rs-angle-small-right">
              <Component01AlignCenter1 />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[467px] size-[24px] top-[11px]">
          <div className="-rotate-90 -scale-y-100 flex-none">
            <div className="overflow-clip relative size-[24px]" data-name="fi-rs-angle-small-right">
              <Component01AlignCenter2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-[35px] top-[91px] w-[507px]" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#f95b1c] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25] text-[#2b2b2b]">Категория</span>
          <span className="leading-[1.25]">*</span>
        </p>
      </div>
      <InputField4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="01 align center">
          <path d={svgPaths.p33891380} fill="#303030" id="Vector" />
          <path d={svgPaths.p152da500} fill="#47D465" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Frame">
      <Group />
    </div>
  );
}

function InputField5() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px relative text-[#252422] text-[16px]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
            <p className="leading-[1.25]">__.__.____</p>
          </div>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[246px]" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Дата рождения</p>
      </div>
      <InputField5 />
    </div>
  );
}

function Component01AlignCenter3() {
  return (
    <div className="absolute inset-[22.05%_30.48%_22.05%_39.17%]" data-name="01 align center">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.414" preserveAspectRatio="none" viewBox="0 0 7.28556 13.414" width="7.28556">
        <g id="01 align center">
          <path d={svgPaths.p3b290f00} fill="#252422" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputField6() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[16px] py-[18px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]">
            <div className="-scale-y-100 flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="fi-rs-angle-small-right">
                <Component01AlignCenter3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[246px]" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#252422] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Пол</p>
      </div>
      <InputField6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex gap-[15px] items-center left-[35px] top-[471px]">
      <Input4 />
      <Input5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[18px] items-center left-[37px] top-[768px]">
      <Component5 className="relative shrink-0 size-[20px]" />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#303030] text-[14px] text-center whitespace-nowrap" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        Организация
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[18px] items-center left-[217px] top-[768px]">
      <Component5 className="relative shrink-0 size-[20px]" />
      <p className="[word-break:break-word] font-['Raleway:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#303030] text-[14px] text-center whitespace-nowrap" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        Разрешить рассылку
      </p>
    </div>
  );
}

function ButtonPrimary() {
  return (
    <div className="absolute h-[56px] left-[426px] rounded-[10px] top-[755px] w-[190px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[158px] py-[17px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[1.25]">Выдать карту</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute bg-white h-[822px] left-[99px] rounded-[10px] top-[85px] w-[628px]" data-name="Данные пользоват">
      <Frame9 />
      <Input3 />
      <Frame8 />
      <p className="[word-break:break-word] absolute font-['Raleway:SemiBold',sans-serif] font-semibold inset-[4.53%_62.9%_92.63%_5.57%] leading-[1.2] text-[#252422] text-[18px]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        Данные пользователя
      </p>
      <div className="absolute left-[551px] overflow-clip size-[57px] top-[16px]" data-name="fi-rs-mode-landscape">
        <svg className="absolute block inset-0 size-full" fill="none" height="57.0008" preserveAspectRatio="none" viewBox="0 0 57.0008 57.0008" width="57.0008">
          <g id="01 align center">
            <path d={svgPaths.p2b2ce880} fill="#E0E4E1" id="Vector" />
            <path d={svgPaths.p2f489280} fill="#E0E4E1" id="Vector_2" />
            <path d={svgPaths.p37407c00} fill="#E0E4E1" id="Vector_3" />
            <path d={svgPaths.p14d17f00} fill="#E0E4E1" id="Vector_4" />
            <path d={svgPaths.p5d44b00} fill="#E0E4E1" id="Vector_5" />
            <path d={svgPaths.p46d1900} fill="#E0E4E1" id="Vector_6" />
          </g>
        </svg>
      </div>
      <Frame2 />
      <Frame5 />
      <ButtonPrimary />
    </div>
  );
}

function Component01AlignCenter4() {
  return (
    <div className="absolute inset-[22.05%_30.48%_22.05%_39.17%]" data-name="01 align center">
      <svg className="absolute block inset-0 size-full" fill="none" height="13.414" preserveAspectRatio="none" viewBox="0 0 7.28556 13.414" width="7.28556">
        <g id="01 align center">
          <path d={svgPaths.p3b290f00} fill="#252422" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputField7() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px opacity-50 relative text-[#252422] text-[16px]">
            <p className="leading-[1.25]">Укажите тип посещения</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]">
            <div className="-scale-y-100 flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="fi-rs-angle-small-right">
                <Component01AlignCenter4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] whitespace-nowrap">
        <p className="leading-[1.25]">Регистрация группы гостей</p>
      </div>
      <InputField7 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[35px] top-[34px] w-[568px]">
      <Input6 />
    </div>
  );
}

function ButtonPrimary1() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative rounded-[10px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[158px] py-[17px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[1.25]">Добавить нового гостя</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonPrimary2() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative rounded-[10px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[158px] py-[17px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[1.25]">Добавить существующего гостя</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[13px] items-center left-[35px] top-[144px] w-[568px]">
      <ButtonPrimary1 />
      <ButtonPrimary2 />
    </div>
  );
}

function ButtonPrimary3() {
  return (
    <div className="absolute h-[56px] left-[425px] rounded-[10px] top-[755px] w-[187px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[158px] py-[17px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[1.25]">Печать договора</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute bg-white h-[822px] left-[753px] rounded-[10px] top-[92px] w-[628px]" data-name="Данные пользоват">
      <Frame10 />
      <Frame12 />
      <ButtonPrimary3 />
    </div>
  );
}

function ButtonPrimary4() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center justify-center px-[158px] py-[17px] relative rounded-[10px] shrink-0 w-[360px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center w-[157px]">
        <p className="leading-[1.25]">Сохранить</p>
      </div>
    </div>
  );
}

function ButtonPrimary5() {
  return (
    <div className="bg-[#47d465] h-[56px] relative rounded-[10px] shrink-0 w-[360px]" data-name="Button / primary">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[calc(50%-0.5px)] text-[16px] text-center text-white top-[28px] w-[271px]">
        <p className="leading-[1.25]">Перейти к покупке и сохранить</p>
      </div>
    </div>
  );
}

function ButtonPrimary6() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-center px-[158px] py-[17px] relative rounded-[10px] shrink-0 w-[360px]" data-name="Button / primary">
      <div aria-hidden className="absolute border border-[#47d465] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="[word-break:break-word] flex flex-col font-['Raleway:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#2b2b2b] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[1.25]">Отмена</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex gap-[35px] items-center left-[178px] top-[940px]">
      <ButtonPrimary4 />
      <ButtonPrimary5 />
      <ButtonPrimary6 />
    </div>
  );
}

function InputField8() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] min-w-px opacity-50 relative text-[#252422] text-[16px]">
            <p className="leading-[1.25]">Введите ИНН</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] inset-[63.38%_55.49%_28.81%_9.31%] items-start" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#f95b1c] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25] text-[#2b2b2b]">ИНН</span>
          <span className="leading-[1.25]">*</span>
        </p>
      </div>
      <InputField8 />
    </div>
  );
}

function InputField9() {
  return (
    <div className="bg-[#f9f9f9] relative rounded-[10px] shrink-0 w-full" data-name="Input field">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[18px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] opacity-50 relative shrink-0 text-[#252422] text-[16px] w-[244px]">
            <p className="leading-[1.25]">Введите реквизиты документа</p>
          </div>
          <div className="h-[20.611px] relative shrink-0 w-[19.438px]" data-name="Vector">
            <div className="absolute inset-[-4.85%_-5.14%]">
              <svg className="block size-full" fill="none" height="22.6106" preserveAspectRatio="none" viewBox="0 0 21.4383 22.6106" width="21.4383">
                <path d={svgPaths.p2e9c59d8} id="Vector" stroke="#2B2B2B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] inset-[72.75%_55.49%_19.43%_9.31%] items-start" data-name="Input">
      <div className="[word-break:break-word] flex flex-col font-['Raleway:Regular',sans-serif] font-normal justify-end leading-[0] relative shrink-0 text-[#f95b1c] text-[14px] whitespace-nowrap">
        <p>
          <span className="leading-[1.25] text-[#2b2b2b]">Документ</span>
          <span className="leading-[1.25]">*</span>
        </p>
      </div>
      <InputField9 />
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute contents left-[782px] top-[319px]" data-name="Ист опер">
      <div className="-translate-y-full [word-break:break-word] absolute flex flex-col font-['Raleway:Regular',sans-serif] font-normal h-[23px] justify-end leading-[0] left-[782px] text-[#252422] text-[16px] top-[342px] w-[340px]" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
        <p className="leading-[1.25]">Выберите гостей для текущего посещения</p>
      </div>
    </div>
  );
}

function Weekdays() {
  return (
    <div className="absolute contents inset-[14.12%_1.72%_74.12%_1.72%]" data-name="Weekdays">
      <div className="absolute bg-[#f5f7fa] inset-[14.12%_1.72%_74.12%_1.72%]" data-name="background" />
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_4.81%_76.76%_87.24%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Вс</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_18.28%_76.76%_73.45%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Сб</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_32.07%_76.76%_59.66%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Пт</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_45.86%_76.76%_45.86%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Чт</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_59.66%_76.76%_32.07%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Ср</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_73.45%_76.76%_18.28%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Вт</p>
      <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[17.06%_87.24%_76.76%_4.48%] leading-[1.5] text-[#424242] text-[14px] text-center tracking-[0.014px]">Пн</p>
    </div>
  );
}

function IcChevronLeft48Px() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="ic_chevron_left_48px">
      <svg className="absolute block inset-0 size-full" fill="none" height="21" preserveAspectRatio="none" viewBox="0 0 21 21" width="21">
        <g id="ic_chevron_left_48px">
          <path d={svgPaths.p25df5d00} fill="#494E50" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IcChevronRight48Px() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="ic_chevron_right_48px">
      <svg className="absolute block inset-0 size-full" fill="none" height="21" preserveAspectRatio="none" viewBox="0 0 21 21" width="21">
        <g id="ic_chevron_right_48px">
          <path d={svgPaths.p2d58b80} fill="#494E50" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function YearSelector() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[14px] right-[13px] top-[14px]" data-name="Year Selector">
      <IcChevronLeft48Px />
      <div className="h-[24px] relative shrink-0 w-[135px]" data-name="year selector">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Raleway:Medium',sans-serif] font-medium leading-[1.5] left-[67.5px] text-[#494e50] text-[14px] text-center top-[calc(50%-11px)] w-[135px]">Март 2024</p>
      </div>
      <IcChevronRight48Px />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[340px] left-0 right-0 rounded-[8px] top-0" data-name="Frame">
      <div className="absolute bg-white border border-[#e5e5e5] border-solid inset-0 rounded-[10px]" data-name="Background" />
      <Weekdays />
      <YearSelector />
    </div>
  );
}

function Dates() {
  return (
    <div className="absolute contents left-[1.72%] right-[1.72%] top-[92px]" data-name="Dates">
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          24
        </p>
      </div>
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] rounded-[8px] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          3
        </p>
      </div>
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          10
        </p>
      </div>
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          17
        </p>
      </div>
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          24
        </p>
      </div>
      <div className="absolute h-[40px] left-[1.72%] overflow-clip right-[84.48%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          31
        </p>
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          25
        </p>
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] rounded-[8px] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#47d465] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          4
        </p>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#47d465] left-1/2 rounded-[10px] size-[4px] top-[calc(50%+11px)]" data-name="dot" />
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          11
        </p>
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          18
        </p>
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          25
        </p>
      </div>
      <div className="absolute h-[40px] left-[15.52%] overflow-clip right-[70.69%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          1
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          26
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-[8px] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          5
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-br-[8px] rounded-tr-[8px] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          12
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          19
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          26
        </p>
      </div>
      <div className="absolute h-[40px] left-[29.31%] overflow-clip right-[56.9%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          2
        </p>
      </div>
      <div className="absolute h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          27
        </p>
      </div>
      <div className="absolute bg-[#47d465] h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[6px] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[14px] text-center text-white" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          6
        </p>
      </div>
      <div className="absolute h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[8px] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          13
        </p>
      </div>
      <div className="absolute h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          20
        </p>
      </div>
      <div className="absolute h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          27
        </p>
      </div>
      <div className="absolute h-[40px] left-[43.1%] overflow-clip right-[43.1%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          3
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          28
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          7
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] rounded-[8px] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          14
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          21
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          28
        </p>
      </div>
      <div className="absolute h-[40px] left-[56.9%] overflow-clip right-[29.31%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          4
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          1
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          8
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] rounded-[8px] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          15
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          22
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          29
        </p>
      </div>
      <div className="absolute h-[40px] left-[70.69%] overflow-clip right-[15.52%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          5
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] rounded-[8px] top-[92px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          2
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] top-[132px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          9
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] rounded-[8px] top-[172px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          16
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] rounded-[8px] top-[212px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          23
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] rounded-[8px] top-[252px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#494e50] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          30
        </p>
      </div>
      <div className="absolute h-[40px] left-[84.48%] overflow-clip right-[1.72%] rounded-[8px] top-[292px]" data-name="day">
        <p className="[word-break:break-word] absolute font-['Raleway:Regular',sans-serif] font-normal inset-[27.5%_20%_20%_20%] leading-[1.5] text-[#a0a5b6] text-[14px] text-center" style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}>
          6
        </p>
      </div>
    </div>
  );
}

function CalendarOpen() {
  return (
    <div className="absolute contents left-0 right-0 top-0" data-name="Calendar Open">
      <Frame1 />
      <Dates />
    </div>
  );
}

function Component4() {
  return (
    <div className="absolute bg-white h-[340px] left-[375px] overflow-clip rounded-[8px] top-[582px] w-[300px]" data-name="Календарь">
      <CalendarOpen />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f6f6f6] relative size-full" data-name="Изменение элементов">
      <p className="[word-break:break-word] absolute font-['Raleway:Bold',sans-serif] font-bold leading-[normal] left-[113px] text-[#2b2b2b] text-[24px] top-[18px] tracking-[0.3px] whitespace-nowrap">Регистрация клиента</p>
      <Frame3 />
      <Frame4 />
      <div className="absolute flex items-center justify-center left-[89px] size-[20px] top-[22px]">
        <div className="flex-none rotate-180">
          <div className="overflow-clip relative size-[20px]" data-name="fi-rs-angle-right">
            <Component01AlignCenter />
          </div>
        </div>
      </div>
      <Component1 />
      <Component2 />
      <Frame11 />
      <Input7 />
      <Input8 />
      <Component3 />
      <Component4 />
    </div>
  );
}