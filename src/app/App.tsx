import { useState, useLayoutEffect, useRef, useEffect } from "react";
import svgPos from "@/imports/КассаАдминистраторВыкл/svg-4602a92fxm";
import svgPosOn from "@/imports/1/svg-tnh89gkkjt";
import svgPathsPin from "@/imports/ВходВСистемуПоПинКоду/svg-m47bpoicig";
import svgPathsSettings from "@/imports/ОкноНастроек/svg-07zwmi8g09";
import svgPayment from "@/imports/Расчет1/svg-s1m9q89cq0";
import svgClose from "@/imports/Group/svg-5zdpobxose";
import svgReg from "@/imports/РегистрацияГостя-1/svg-2ne1v20uh3";
import svgNewData from "@/imports/НовыеДанные/svg-49bwdoakjj";
import svgCard from "@/imports/СчитатьКарту/svg-lwbgswx1qv";
import svgClientInfo from "@/imports/СРегистрацией/svg-3jfmc2efvu";
import reportSalesTotal from "@/assets/reports/sales-total.png";
import reportPaymentsSummary from "@/assets/reports/payments-summary.png";
import reportRentalTotal from "@/assets/reports/rental-total.png";
import reportRentalDetail from "@/assets/reports/rental-detail.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "login-password" | "login-pin" | "select-installation" | "settings" | "pos";

interface CartItem { id: number; productId: number; name: string; price: number; guestName?: string; kind?: "debt" | "return-carrier"; card?: string; }
interface Product  { id: number; name: string; price: number; bg: string; priceLabel?: string; }

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1,  name: "Грандиозная паровая карусель",   price: 250, bg: "#a9e9e0" },
  { id: 2,  name: "Колесо обозрения",               price: 250, bg: "#fac2d9" },
  { id: 3,  name: "Пакет на колесо",                price: 250, bg: "#e6dade" },
  { id: 4,  name: "Грандиозная непаровая карусель", price: 250, bg: "#d1d7ff" },
  { id: 5,  name: "Грандиозная паровая карусель",   price: 250, bg: "#ffffff" },
  { id: 6,  name: "Грандиозная паровая карусель",   price: 250, bg: "#ffffff" },
  { id: 7,  name: "Колесо обозрения",               price: 250, bg: "#ffffff" },
  { id: 8,  name: "Колесо обозрения",               price: 250, bg: "#ffffff" },
  { id: 9,  name: "Пакет на колесо",                price: 250, bg: "#ffffff" },
  { id: 10, name: "Пакет на колесо",                price: 250, bg: "#ffffff" },
  { id: 11, name: "Грандиозная непаровая карусель", price: 250, bg: "#ffffff" },
  { id: 12, name: "Грандиозная непаровая карусель", price: 250, bg: "#ffffff" },
];

const ACCOUNT_CARDS: Product[] = [
  { id: 101, name: "Бонусы",  price: 0,   bg: "#ffffff" },
  { id: 102, name: "Депозит", price: 250, bg: "#ffffff", priceLabel: "от 250 ₽" },
];

const INSTALLATIONS = [
  "Парк аттракционов",
  "Тестовая касса",
  "Аквапарки,  термы для презентаций",
  "Активитти",
  "Кидбург",
  "Кидбург",
  "Кидбург",
];

const ALL_KASSAS = ["Тестовая касса", "Онлайн касса", "Австокасса", "Онлайн касса", "Австокасса"];

const PIN_LENGTH = 4;
let nextCartId = 1;

// ─── Theme helpers ────────────────────────────────────────────────────────────

const th = (dark: boolean) => ({
  screenBg:    dark ? "#1e1d1b" : "#f6f6f6",
  cardBg:      dark ? "#252422" : "#ffffff",
  inputBg:     dark ? "#303030" : "#f9f9f9",
  textPrimary: dark ? "#ffffff" : "#2b2b2b",
  textSec:     dark ? "#fafaf9" : "#252422",
  textMuted:   dark ? "rgba(241,240,239,0.5)" : "rgba(37,36,34,0.5)",
  divider:     dark ? "#3a3a3a" : "#e5e5e5",
  sidebarBg:   dark ? "#252422" : "#ffffff",
  searchBg:    dark ? "#303030" : "#ffffff",
  filterBg:    dark ? "#303030" : "#ffffff",
  productCard: dark ? "#2e2e2c" : "#ffffff",
  bottomBarBg: dark ? "#252422" : "#ffffff",
});

// ─── POS SVG Icons ────────────────────────────────────────────────────────────

function IconLogo() {
  return (
    <svg fill="none" viewBox="0 0 30.24 29.83" className="w-[30px] h-[30px]">
      <path clipRule="evenodd" d={svgPos.p1958c180} fill="#F980FF" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPos.p155d200}  fill="#4DD0FF" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPos.p2103af00} fill="#F95B1C" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPos.p2aa80700} fill="#47D465" fillRule="evenodd" />
    </svg>
  );
}

function IconUserPlus({ color = "white" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p3f80dc40} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPos.p1280af80} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 8V14"  stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M23 11H17" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconHome({ color = "white" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d="M4 11.5L12 4L20 11.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M6 9.5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V9.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M10 20V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V20" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconMenu({ color = "white" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d="M5 6H19"  stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <path d="M5 11H19" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <path d="M5 16H19" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <path d="M5 21H19" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  );
}

function IconTrash({ color = "#303030" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-5">
      <path d="M3 6H21" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M19 6L18.133 19.142C18.0579 20.1891 17.187 21 16.137 21H7.863C6.813 21 5.9421 20.1891 5.867 19.142L5 6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M10 11V16" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14 11V16" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconWarning({ color = "#F95B1C" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-[18px] shrink-0">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path d="M12 10.5V16" stroke={color} strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="7.5" r="1.15" fill={color} />
    </svg>
  );
}

function IconShield() {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPosOn.p2e91c880} stroke="#47D465" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconSettingsGear({ color = "black" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p3cccb600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPos.p3737f500} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconMessage({ color = "black" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p1edfde00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconLogout({ color = "black" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p29914600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16 17L21 12L16 7" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 12H9"           stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconSearch({ color = "#B9BBB8" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 18.06 18.06" className="size-[18px]">
      <path d={svgPos.pf48b400} fill={color} />
    </svg>
  );
}

function IconFilter({ color = "#303030" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p1087e300} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function IconAngleRight({ color = "#303030" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 10.14 19.99" className="size-5">
      <path d={svgPos.p19491700} fill={color} />
    </svg>
  );
}

function IconPercent() {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d="M19 5L5 19" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPos.p2e4e9170} stroke="#FFFBFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPos.p2517da40} stroke="#FFFBFB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

// Login/Settings icons (reuse from settings SVG)
function IconBackspace() {
  return (
    <svg fill="none" viewBox="0 0 19.9963 16" className="size-6">
      <path d={svgPathsPin.p7a41e80} fill="#303030" />
    </svg>
  );
}

function IconChevron({ down = true, color = "#252422" }: { down?: boolean; color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 7.29 13.41" className="size-[14px]"
      style={{ transform: down ? "rotate(90deg)" : "rotate(-90deg)" }}>
      <path d={svgPathsSettings.p3b290f00} fill={color} />
    </svg>
  );
}

// ─── Admin Toggle ─────────────────────────────────────────────────────────────

function AdminToggle({ on, onToggle, dark }: { on: boolean; onToggle: () => void; dark: boolean }) {
  const c = th(dark);
  return (
    <button
      onClick={onToggle}
      className="absolute flex items-center gap-4 cursor-pointer select-none"
      style={{ left: 844, top: 29, background: "none", border: "none", padding: 0 }}
    >
      <div
        className="relative shrink-0 transition-colors duration-200"
        style={{ width: 40.6, height: 24, borderRadius: 17.5, backgroundColor: on ? "#47d465" : "#a4a4a4" }}
      >
        <div
          className="absolute transition-all duration-200"
          style={{
            top: "11.54%", bottom: "11.54%", width: "45.36%",
            borderRadius: "50%", backgroundColor: "white",
            left: on ? "47.73%" : "8.9%",
          }}
        />
      </div>
      <span className="text-[16px] font-normal whitespace-nowrap" style={{ color: c.textSec }}>
        Режим администратора
      </span>
    </button>
  );
}

// ─── Dark Theme Toggle ────────────────────────────────────────────────────────

function RequireRegistrationToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-4 cursor-pointer select-none"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <div
        className="relative shrink-0 transition-colors duration-200"
        style={{ width: 40.6, height: 24, borderRadius: 17.5, backgroundColor: on ? "#47d465" : "#a4a4a4" }}
      >
        <div
          className="absolute transition-all duration-200"
          style={{
            top: "11.54%", bottom: "11.54%", width: "45.36%",
            borderRadius: "50%", backgroundColor: "white",
            left: on ? "47.73%" : "8.9%",
          }}
        />
      </div>
      <span className="text-[16px] font-normal whitespace-nowrap" style={{ color: "#252422" }}>
        Обязательная регистрация
      </span>
    </button>
  );
}

// ─── Login Screens ────────────────────────────────────────────────────────────

function TabSwitcher({ activeTab, onSwitch, dark }: {
  activeTab: "password" | "pin"; onSwitch: (t: "password" | "pin") => void; dark: boolean
}) {
  const c = th(dark);
  return (
    <div className="relative h-[57px] w-[392px] rounded-[10px] overflow-hidden shrink-0" style={{ backgroundColor: c.inputBg }}>
      {(["password", "pin"] as const).map((tab, i) => {
        const active = activeTab === tab;
        return (
          <button key={tab} onClick={() => !active && onSwitch(tab)}
            className="absolute top-[4px] h-[49px] flex items-center justify-center text-[14px] rounded-[8px] transition-all duration-150 select-none"
            style={{
              left: i === 0 ? 0 : 195, width: i === 0 ? 191 : 195,
              backgroundColor: active ? "#5ae277" : "transparent",
              color: active ? "white" : c.textSec,
              opacity: active ? 1 : 0.45,
              fontWeight: active ? 600 : 400,
              cursor: active ? "default" : "pointer",
            }}>
            {tab === "password" ? "По паролю" : "По пин-коду"}
          </button>
        );
      })}
    </div>
  );
}

function LoginPasswordScreen({ onLogin, onSwitchToPin, dark }: { onLogin: () => void; onSwitchToPin: () => void; dark: boolean }) {
  const c = th(dark);
  const inputStyle: React.CSSProperties = {
    width: "100%", height: 56, borderRadius: 10, padding: "0 16px",
    fontSize: 16, fontWeight: 400, fontFamily: "inherit",
    backgroundColor: c.inputBg, color: c.textSec, border: "none", outline: "none",
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <div className="rounded-[10px] w-[596px] py-[56px] transition-colors duration-300" style={{ backgroundColor: c.cardBg }}>
        <p className="text-[24px] font-bold text-center mb-8" style={{ color: c.textPrimary }}>Вход в систему</p>
        <div className="flex justify-center mb-8">
          <TabSwitcher activeTab="password" onSwitch={(t) => t === "pin" && onSwitchToPin()} dark={dark} />
        </div>
        <div className="flex flex-col gap-6 px-[98px]">
          {[["Адрес сервера", "https;//admin.lime-it.ru/", "text"], ["Телефон/Почта", "", "text"], ["Пароль", "", "password"]].map(([label, def, type]) => (
            <div key={label as string} className="flex flex-col gap-[6px]">
              <label className="text-[14px] font-normal" style={{ color: c.textSec }}>{label as string}</label>
              <input type={type as string} defaultValue={def as string} className="rounded-[10px] focus:ring-2 focus:ring-[#47d465]/40" style={inputStyle} />
            </div>
          ))}
        </div>
        <div className="px-[98px] mt-8">
          <button onClick={onLogin}
            className="w-full h-[56px] bg-[#47d465] rounded-[10px] text-white text-[14px] font-semibold cursor-pointer transition-all duration-150 hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98] select-none">
            Войти в систему
          </button>
        </div>
      </div>
    </div>
  );
}

function PinButton({ label, onClick }: { label: string | React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="size-[61px] shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-[#e0e0e0] active:bg-[#d0d0d0] active:scale-[0.93] select-none"
      style={{ backgroundColor: "#f9f9f9" }}>
      {typeof label === "string"
        ? <span className="text-[#303030] font-semibold" style={{ fontSize: label.length > 1 ? 15 : 28 }}>{label}</span>
        : label}
    </button>
  );
}

function LoginPinScreen({ onLogin, onSwitchToPassword, dark }: { onLogin: () => void; onSwitchToPassword: () => void; dark: boolean }) {
  const [pin, setPin] = useState("");
  const c = th(dark);
  const handleDigit = (d: string) => {
    if (pin.length < PIN_LENGTH) {
      const next = pin + d;
      setPin(next);
      if (next.length === PIN_LENGTH) setTimeout(onLogin, 300);
    }
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <div className="rounded-[10px] w-[596px] py-[56px] transition-colors duration-300" style={{ backgroundColor: c.cardBg }}>
        <p className="text-[24px] font-bold text-center mb-8" style={{ color: c.textPrimary }}>Вход в систему</p>
        <div className="flex justify-center mb-8"><TabSwitcher activeTab="pin" onSwitch={(t) => t === "password" && onSwitchToPassword()} dark={dark} /></div>
        <p className="text-[14px] font-normal text-center mb-4" style={{ color: c.textSec }}>Введите пин-код</p>
        <div className="flex items-center justify-center gap-6 mb-7">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div key={i} className="size-[14px] rounded-[8px] transition-all duration-150"
              style={{ backgroundColor: i < pin.length ? "#5ae277" : dark ? "#555" : "#d8d8d8" }} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-5 mb-8">
          {[["1","2","3"],["4","5","6"],["7","8","9"]].map((row) => (
            <div key={row[0]} className="flex gap-6">
              {row.map((d) => <PinButton key={d} label={d} onClick={() => handleDigit(d)} />)}
            </div>
          ))}
          <div className="flex gap-6">
            <PinButton label="Clr" onClick={() => setPin("")} />
            <PinButton label="0" onClick={() => handleDigit("0")} />
            <PinButton label={<IconBackspace />} onClick={() => setPin((p) => p.slice(0, -1))} />
          </div>
        </div>
        <div className="px-[98px]">
          <button onClick={pin.length === PIN_LENGTH ? onLogin : undefined}
            className={["w-full h-[56px] rounded-[10px] text-white text-[14px] font-semibold transition-all duration-150 select-none bg-[#47d465]",
              pin.length === PIN_LENGTH ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "opacity-40 cursor-default",
            ].join(" ")}>
            Войти в систему
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Select Installation Screen ───────────────────────────────────────────────

function SelectInstallationScreen({ onOk, onCancel, dark }: { onOk: () => void; onCancel: () => void; dark: boolean }) {
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const c = th(dark);
  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollRatio(max > 0 ? el.scrollTop / max : 0);
  };
  const TRACK_H = 393, THUMB_H = Math.round(TRACK_H * 0.8);
  const thumbTop = Math.round(scrollRatio * (TRACK_H - THUMB_H));
  return (
    <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <div className="relative w-[596px] h-[615px] rounded-[10px] overflow-hidden transition-colors duration-300" style={{ backgroundColor: c.cardBg }}>
        <p className="absolute text-[24px] font-bold text-center top-[50px] left-0 right-0" style={{ color: c.textPrimary }}>
          {"Выберите  инсталляцию"}
        </p>
        <div ref={listRef} onScroll={onScroll}
          className="absolute left-[50px] top-[106px] w-[498px] flex flex-col gap-[15px] overflow-y-auto pr-[22px]"
          style={{ maxHeight: 395, scrollbarWidth: "none" }}>
          {INSTALLATIONS.map((name, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className="relative h-[56px] w-full rounded-[10px] flex items-center px-4 cursor-pointer select-none text-left shrink-0 transition-all duration-150 hover:brightness-95 active:scale-[0.99]"
              style={{ backgroundColor: i === selected ? (dark ? "#303030" : "#f9f9f9") : (dark ? "rgba(48,48,48,0.6)" : "#f9f9f9") }}>
              <div className="absolute left-[16px] size-[24px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="size-6">
                  <circle cx="12" cy="12" r="11.5" stroke="#47D465" fill="none" strokeWidth="1" />
                  {i === selected && <circle cx="12" cy="12" r="7" fill="#47D465" />}
                </svg>
              </div>
              <span className="ml-[46px] text-[16px] font-semibold" style={{ color: c.textPrimary }}>{name}</span>
            </button>
          ))}
        </div>
        <div className="absolute" style={{ left: 565, top: 107, width: 2, height: TRACK_H }}>
          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: c.divider }} />
          <div className="absolute rounded-full transition-all duration-100" style={{ width: 2, height: THUMB_H, top: thumbTop, backgroundColor: "#47D465" }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[99px] flex items-center justify-center gap-[14px] transition-colors duration-300"
          style={{ backgroundColor: c.cardBg, borderTop: `1px solid ${c.divider}` }}>
          <button onClick={onOk}
            className="w-[220px] h-[56px] rounded-[10px] text-[16px] font-semibold transition-all duration-150 cursor-pointer hover:bg-[#efffef] active:bg-[#dcffdc] active:scale-[0.98] select-none"
            style={{ backgroundColor: c.cardBg, color: c.textPrimary, border: "1.5px solid #47d465" }}>Ок</button>
          <button onClick={onCancel}
            className="w-[220px] h-[56px] rounded-[10px] text-[16px] font-semibold transition-all duration-150 cursor-pointer hover:brightness-95 active:scale-[0.98] select-none"
            style={{ backgroundColor: c.inputBg, color: c.textPrimary }}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────

function SettingsScreen({ dark, requireRegistration, onToggleRequireRegistration, onSave, onBack }: {
  dark: boolean; requireRegistration: boolean; onToggleRequireRegistration: () => void; onSave: () => void; onBack: () => void;
}) {
  const [kassa, setKassa] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const c = th(dark);

  useEffect(() => {
    if (dropOpen) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch("");
  }, [dropOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = ALL_KASSAS.filter((k) => k.toLowerCase().includes(search.toLowerCase()));
  const canSave = !!kassa;
  const inputBoxStyle: React.CSSProperties = {
    backgroundColor: c.inputBg, color: c.textSec, borderRadius: 10,
    padding: "18px 16px", fontSize: 16, fontFamily: "inherit", width: "100%",
  };

  return (
    <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <div className="absolute rounded-[10px] transition-colors duration-300"
        style={{ left: 166, top: 131, width: 1108, height: 762, backgroundColor: c.cardBg }}>
        <p className="absolute text-[24px] font-bold top-[50px] left-[154px]" style={{ color: c.textPrimary }}>Окно настроек</p>
        <div className="absolute" style={{ left: 788, top: 51 }}>
          <RequireRegistrationToggle on={requireRegistration} onToggle={onToggleRequireRegistration} />
        </div>
        <div className="absolute flex flex-col gap-6" style={{ left: 154, top: 106, width: 787 }}>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] font-normal" style={{ color: c.textSec }}>Инсталляция</label>
            <div style={inputBoxStyle}>Тестовая касса</div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] font-normal" style={{ color: c.textSec }}>Адрес сервера (изменяется при авторизации)</label>
            <input defaultValue="https;//demo.lime-it.ru/" className="outline-none focus:ring-2 focus:ring-[#47d465]/40 rounded-[10px]" style={inputBoxStyle} />
          </div>
          <div ref={dropRef} className="flex flex-col gap-[6px] relative">
            <label className="text-[14px] font-normal" style={{ color: "#47d465" }}>Номер кассы*</label>
            <button onClick={() => setDropOpen((o) => !o)}
              className="w-full flex items-center justify-between rounded-[10px] cursor-pointer select-none transition-all duration-150 hover:brightness-95"
              style={{ ...inputBoxStyle, border: "1.5px solid #47d465", boxSizing: "border-box", display: "flex" }}>
              <span style={{ color: kassa ? c.textSec : c.textMuted }}>{kassa || "Выбрать кассу"}</span>
              <span style={{ transform: dropOpen ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.15s" }}>
                <IconChevron down={false} color={dark ? "#f1f0ef" : "#252422"} />
              </span>
            </button>
            {dropOpen && (
              <div className="absolute left-0 right-0 z-20 rounded-b-[10px] overflow-hidden"
                style={{ top: "100%", border: "1.5px solid #47d465", borderTop: "none", backgroundColor: c.inputBg }}>
                <div className="px-4 py-2 border-b" style={{ borderColor: c.divider }}>
                  <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск..."
                    className="w-full bg-transparent outline-none text-[15px] font-normal" style={{ color: c.textSec }} />
                </div>
                {filtered.length === 0
                  ? <div className="px-4 py-3 text-[15px]" style={{ color: c.textMuted }}>Ничего не найдено</div>
                  : filtered.map((k, i) => {
                    const highlighted = k === "Тестовая касса" && i === 0 && !kassa;
                    return (
                      <button key={i} onClick={() => { setKassa(k); setDropOpen(false); }}
                        className="w-full text-left px-4 py-3 text-[16px] font-normal cursor-pointer select-none"
                        style={{ backgroundColor: highlighted ? "rgba(71,212,101,0.19)" : "transparent", color: c.textSec, transition: "background 0.1s" }}
                        onMouseEnter={(e) => { if (!highlighted) (e.currentTarget as HTMLElement).style.backgroundColor = dark ? "#3a3a37" : "#f0f0f0"; }}
                        onMouseLeave={(e) => { if (!highlighted) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                        {k}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className="absolute flex items-center gap-[14px]" style={{ left: 180, top: 680 }}>
          <button className="h-[56px] w-[245px] rounded-[10px] text-[16px] font-semibold transition-all duration-150 cursor-pointer hover:opacity-80 active:scale-[0.98] select-none"
            style={{ backgroundColor: "transparent", color: dark ? "#47d465" : "#2b2b2b", border: "1.5px solid #47d465" }}>
            Изменить стили
          </button>
          <button onClick={canSave ? onSave : undefined}
            className={["h-[56px] w-[252px] rounded-[10px] text-[16px] font-semibold text-white transition-all duration-150 select-none bg-[#47d465]",
              canSave ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "opacity-55 cursor-default",
            ].join(" ")}>
            Сохранить
          </button>
          <button onClick={onBack}
            className="h-[56px] w-[220px] rounded-[10px] text-[16px] font-semibold transition-all duration-150 cursor-pointer active:scale-[0.98] select-none"
            style={{ backgroundColor: "#f6f6f6", color: "#2b2b2b" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ebebeb")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f6f6f6")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "")}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── POS Sub-components ───────────────────────────────────────────────────────

function LeftSidebar({ dark, adminMode, onLogout, onUserPlus, onMenu, onHome, homeActive, onShield, onSettings, settingsOpen }: {
  dark: boolean; adminMode: boolean; onLogout: () => void; onUserPlus: () => void; onMenu?: () => void;
  onHome?: () => void; homeActive?: boolean; onShield?: () => void; onSettings?: () => void; settingsOpen?: boolean;
}) {
  const c = th(dark);
  const ic = dark ? "#ffffff" : "black";
  const accentBg = dark ? "#ffffff" : "#2b2b2b";
  const accentIcon = dark ? "#2b2b2b" : "white";
  const iconBtn = "flex items-center justify-center cursor-pointer transition-all duration-150 hover:opacity-70 active:opacity-50 active:scale-[0.93] select-none";
  const menuTop = onHome ? 202 : 142;
  return (
    // z-[70]: stays above full-screen gate overlays (AuthGateModal, RegistrationScreen) so
    // Menu/Home remain reachable while a registration/auth step is showing (see PosScreen).
    <div className="absolute left-px top-0 w-[72px] h-[1024px] overflow-clip transition-colors duration-300 z-[70]" style={{ backgroundColor: c.sidebarBg }}>
      {/* Logo — matches Figma: inset-[1.46% 29.4% 95.64% 29.17%] of 72×1024 */}
      <div className="absolute" style={{ left: 21, top: 15 }}><IconLogo /></div>

      {/* User+ button */}
      <button
        onClick={onUserPlus}
        className={`absolute left-[11px] top-[82px] w-[50px] h-[48px] rounded-[10px] flex items-center justify-center transition-colors duration-300 ${iconBtn}`}
        style={{ backgroundColor: accentBg }}
      >
        <IconUserPlus color={accentIcon} />
      </button>

      {/* Home button — only shown when "Обязательная регистрация" is on; toggles Дом mode */}
      {onHome && (
        <button
          onClick={onHome}
          className={`absolute left-[11px] top-[142px] w-[50px] h-[48px] rounded-[10px] flex items-center justify-center transition-colors duration-300 ${iconBtn}`}
          style={{ backgroundColor: homeActive ? "#47d465" : accentBg }}
        >
          <IconHome color={homeActive ? "white" : accentIcon} />
        </button>
      )}

      {/* Menu button */}
      <button
        onClick={onMenu}
        className={`absolute left-[11px] w-[50px] h-[48px] rounded-[10px] flex items-center justify-center transition-all duration-300 ${iconBtn}`}
        style={{ top: menuTop, backgroundColor: accentBg }}
      >
        <IconMenu color={accentIcon} />
      </button>

      {/* Bottom icon cluster: shield (admin only), settings, message, logout */}
      <div className="absolute flex flex-col gap-[29px]" style={{ left: 24, top: adminMode ? 809 : 838 }}>
        {adminMode && (
          <button onClick={onShield} aria-label="Режим администратора" className={`${iconBtn} outline-none`}><IconShield /></button>
        )}
        <button onClick={onSettings} aria-label="Действия с кассой" aria-expanded={settingsOpen}
          className={`${iconBtn} -m-[8px] p-[8px] rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-[#47d465]`}
          style={{ backgroundColor: settingsOpen ? (dark ? "#3a3a39" : "#ececec") : undefined }}>
          <IconSettingsGear color={settingsOpen ? "#47d465" : ic} />
        </button>
        <div className={iconBtn}><IconMessage color={ic} /></div>
        <button onClick={onLogout} className={iconBtn}><IconLogout color={ic} /></button>
      </div>
    </div>
  );
}

// ─── Sidebar "Меню" drawer ─────────────────────────────────────────────────────
// Two panels next to the sidebar: the main menu (big action / section cards) and,
// after clicking a card marked with the angle icon, a second panel with that
// section's actions and their hotkeys.

type MenuIconKind = "ticket" | "lock" | "user" | "card" | "monitor";
interface MenuLeaf { label: string; badge?: string; opensClientInfo?: boolean; action?: MenuAction; }
interface MenuSection {
  key: string; label: string; badge?: string; icon?: MenuIconKind; action?: MenuAction;
  leaves?: MenuLeaf[]; columns?: MenuLeaf[][]; isMonitor?: boolean;
}

const MENU_SECTIONS: MenuSection[] = [
  { key: "debts",    label: "Гашение долгов", badge: "F8", action: "debts" },
  { key: "qr",       label: "Печать последних QR кодов" },
  { key: "precheck", label: "Печать пречека" },
  { key: "return", label: "Возврат товара", icon: "ticket", leaves: [
      { label: "По карте", badge: "Backspace", action: "returnCard" },
      { label: "По чеку", badge: "Alt+Backspace", action: "returnCheck" },
      { label: "Возврат носителя", badge: "Ctrl+Backspace", action: "returnCarrier" },
  ]},
  { key: "pledge", label: "Залог", icon: "lock", leaves: [
      { label: "По карте", action: "pledgeTake" },
      { label: "Вернуть залог", action: "pledgeReturn" },
      { label: "Ячейки с залогом", action: "pledgeCells" },
  ]},
  { key: "client", label: "Информация о клиенте", icon: "user", leaves: [
      { label: "По карте", badge: "F1", opensClientInfo: true },
      { label: "По бортовому" },
      { label: "По телефону", badge: "F2" },
      { label: "Поиск клиента...", action: "clientSearch" },
      { label: "История по карте", action: "cardHistory" },
  ]},
  { key: "cards", label: "Карты", icon: "card", columns: [
      [
        { label: "С регистрацией", badge: "Insert" },
        { label: "По карте", badge: "Ctrl+Insert" },
        { label: "Доп. по карте", action: "cardExtra" },
        { label: "Доп. с поиском", action: "cardExtraSearch" },
        { label: "Оказание услуги", badge: "Home", action: "service" },
      ],
      [
        { label: "Блокировать", action: "cardBlock" },
        { label: "Разблокировать", action: "cardUnblock" },
        { label: "Расширить билет", badge: "PageUp", action: "extendTicket" },
        { label: "Слияние счетов клиентов", action: "mergeAccounts" },
      ],
  ]},
  { key: "preorder", label: "Предварительные заказы", icon: "card", leaves: [
      { label: "Получить предзаказ", badge: "F12", action: "preorders" },
      { label: "Внести предоплату", action: "preorders" },
      { label: "Вернуть предоплату", action: "preorders" },
  ]},
  { key: "monitors", label: "Мониторы", icon: "monitor", isMonitor: true },
];

function MonitorsPanel({ dark }: { dark: boolean }) {
  const c = th(dark);
  const zones = [{ name: "Зона 1", cur: 10, max: 15 }, { name: "Зона 2", cur: 10, max: 15 }];
  return (
    <div style={{ width: "100%" }}>
      <div className="flex items-center gap-[8px] mb-[14px]">
        <span className="size-[8px] rounded-full shrink-0" style={{ backgroundColor: "#47d465" }} />
        <span className="text-[15px] font-semibold flex-1" style={{ color: c.textPrimary }}>Монитор посещаемости</span>
        <span className="text-[11px] opacity-50 whitespace-nowrap" style={{ color: c.textSec }}>Внутри/Максимум</span>
      </div>
      <div className="flex flex-col">
        {zones.map((z, i) => (
          <div key={z.name} className="flex items-center justify-between py-[10px]"
            style={{ borderTop: i > 0 ? `1px solid ${c.divider}` : "none" }}>
            <span className="text-[14px]" style={{ color: c.textSec }}>{z.name}</span>
            <span className="text-[14px] font-bold" style={{ fontFeatureSettings: '"lnum","pnum"' }}>
              <span style={{ color: "#F95B1C" }}>{z.cur}</span>
              <span style={{ color: c.textSec }}>/{z.max}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Large faded outline icon tucked into a card's bottom-right corner (cropped by the card).
function MenuWatermark({ kind, dark }: { kind: MenuIconKind; dark: boolean }) {
  const stroke = dark ? "#5a5a58" : "#c6c6c6";
  const accent = dark ? "#4b6f8c" : "#a9d6f5";
  const p = { fill: "none", stroke, strokeWidth: 5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const a = { fill: "none", stroke: accent, strokeWidth: 5, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute pointer-events-none"
      style={{ width: 118, height: 118, right: -16, bottom: -24, transform: "rotate(-14deg)" }}>
      {kind === "ticket" && (<>
        <path {...p} d="M18 28H82A6 6 0 0 1 88 34V44A6 6 0 0 0 88 56V66A6 6 0 0 1 82 72H18A6 6 0 0 1 12 66V56A6 6 0 0 0 12 44V34A6 6 0 0 1 18 28Z" />
        <path {...a} d="M50 36V42M50 47V53M50 58V64" />
      </>)}
      {kind === "lock" && (<>
        <rect {...p} x="20" y="44" width="60" height="42" rx="7" />
        <path {...p} d="M34 44V34A16 16 0 0 1 66 34V44" />
        <path {...a} d="M50 58V70" />
      </>)}
      {kind === "user" && (<>
        <circle {...p} cx="50" cy="34" r="15" />
        <path {...p} d="M18 90A32 32 0 0 1 82 90" />
        <path {...a} d="M50 66V78" />
      </>)}
      {kind === "card" && (<>
        <rect {...p} x="10" y="26" width="80" height="50" rx="8" />
        <path {...p} d="M10 42H90" />
        <path {...a} d="M22 62H38" />
      </>)}
      {kind === "monitor" && (<>
        <rect {...p} x="12" y="22" width="76" height="48" rx="7" />
        <path {...p} d="M36 86H64M50 70V86" />
        <path {...a} d="M26 56L38 46L48 54L62 38" />
      </>)}
    </svg>
  );
}

const MENU_CARD_W = 338;
const MENU_CARD_H = 132;
const MENU_GAP = 10;
const MENU_HEADER_H = 76;

function SidebarMenu({ dark, onClose, onClientInfo, onAction }: { dark: boolean; onClose: () => void; onClientInfo: () => void; onAction: (a: MenuAction) => void }) {
  const c = th(dark);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const activeSection = openKey ? MENU_SECTIONS.find((s) => s.key === openKey) ?? null : null;

  // Card size is fixed; how many fit per column follows from the 1024px canvas height.
  const perColumn = Math.max(1, Math.floor((1024 - MENU_HEADER_H - 20 + MENU_GAP) / (MENU_CARD_H + MENU_GAP)));
  const menuColumns: MenuSection[][] = [];
  for (let i = 0; i < MENU_SECTIONS.length; i += perColumn) menuColumns.push(MENU_SECTIONS.slice(i, i + perColumn));
  const mainPanelW = 32 + menuColumns.length * MENU_CARD_W + (menuColumns.length - 1) * MENU_GAP;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Card states: default → hover → pressed (dark outline); "open" = its submenu is showing.
  const cardCls = dark
    ? "bg-[#303030] hover:bg-[#3a3a3a] active:bg-[#444444] active:shadow-[inset_0_0_0_1.5px_#ffffff]"
    : "bg-[#f5f5f5] hover:bg-[#ebebeb] active:bg-[#e2e2e2] active:shadow-[inset_0_0_0_1.5px_#2b2b2b]";
  const cardOpenCls = dark
    ? "bg-[#1f4a2a] hover:bg-[#25573a] active:bg-[#2c6444] active:shadow-[inset_0_0_0_1.5px_#ffffff]"
    : "bg-[#dffbe6] hover:bg-[#d3f7dc] active:bg-[#c6f2d1] active:shadow-[inset_0_0_0_1.5px_#2b2b2b]";
  const baseBtn = "group relative text-left select-none cursor-pointer outline-none rounded-[12px] transition-[background-color,box-shadow] duration-150 focus-visible:shadow-[inset_0_0_0_2px_#47d465]";
  const pillCls = dark
    ? "bg-[#454545] group-hover:bg-[#505050] text-[#bdbdbd]"
    : "bg-[#e6e6e6] group-hover:bg-[#dcdcdc] text-[#8a8a8a]";
  const panelStyle: React.CSSProperties = { backgroundColor: c.sidebarBg, boxShadow: "0 0 28px rgba(0,0,0,0.14)" };

  const renderClose = (onClick: () => void, label: string) => (
    <button onClick={onClick} aria-label={label}
      className="flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]">
      <svg viewBox="0 0 24 24" className="size-[20px]" fill="none">
        <path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  );

  const renderLeaf = (leaf: MenuLeaf, key: string) => (
    <button key={key} onClick={() => (leaf.opensClientInfo ? onClientInfo() : leaf.action ? onAction(leaf.action) : onClose())}
      className={`${baseBtn} ${cardCls} flex items-center justify-between`}
      style={{ height: 72, padding: "0 18px", color: c.textPrimary }}>
      <span className="text-[18px] font-medium leading-[1.2]">{leaf.label}</span>
      {leaf.badge && (
        <span className={`shrink-0 ml-[12px] rounded-[6px] px-[8px] py-[3px] text-[13px] whitespace-nowrap transition-colors duration-150 ${pillCls}`}>
          {leaf.badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      <div className="fixed inset-0" style={{ zIndex: 39, backgroundColor: "rgba(50,50,50,0.38)" }} onClick={onClose} />
      <div className="absolute flex items-start" style={{ left: 73, top: 0, height: 1024, zIndex: 40 }}>
        {/* Main panel */}
        <div className="flex flex-col transition-colors duration-300" style={{ width: mainPanelW, height: 1024, ...panelStyle }}>
          <div className="flex items-center justify-between shrink-0" style={{ padding: "26px 16px 14px 20px", height: MENU_HEADER_H }}>
            <p className="font-bold text-[24px]" style={{ color: c.textPrimary }}>Меню</p>
            {renderClose(onClose, "Закрыть меню")}
          </div>
          {/* No scrolling: cards keep their size and the ones that don't fit
              the height flow into the next column. */}
          <div className="flex min-h-0" style={{ gap: MENU_GAP, padding: "0 16px 20px" }}>
            {menuColumns.map((col, ci) => (
              <div key={ci} className="flex flex-col shrink-0" style={{ width: MENU_CARD_W, gap: MENU_GAP }}>
                {col.map((sec) => {
                  const navigable = !!(sec.leaves || sec.columns || sec.isMonitor);
                  const isOpen = openKey === sec.key;
                  return (
                    <button key={sec.key} aria-expanded={navigable ? isOpen : undefined}
                      onClick={() => (navigable ? setOpenKey(isOpen ? null : sec.key) : sec.action ? onAction(sec.action) : onClose())}
                      className={`${baseBtn} ${isOpen ? cardOpenCls : cardCls} overflow-hidden shrink-0`}
                      style={{ height: MENU_CARD_H, padding: "20px 18px", color: c.textPrimary }}>
                      {sec.icon && <MenuWatermark kind={sec.icon} dark={dark} />}
                      <span className="relative block text-[21px] font-medium leading-[1.2]" style={{ paddingRight: 30 }}>{sec.label}</span>
                      {sec.badge && (
                        <span className="absolute text-[13px] opacity-55" style={{ right: 16, top: 20 }}>{sec.badge}</span>
                      )}
                      {navigable && (
                        <span className="absolute flex items-center" style={{ right: 16, top: 24, transform: "rotate(90deg)" }}>
                          <IconChevron down={false} color={dark ? "#fafaf9" : "#252422"} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Submenu panel */}
        {activeSection && (
          <div className="flex flex-col rounded-r-[12px] transition-colors duration-300"
            style={{ width: activeSection.columns ? 640 : 366, maxHeight: 1024, ...panelStyle }}>
            <div className="flex items-center justify-between shrink-0" style={{ padding: "26px 16px 14px 20px" }}>
              <p className="font-bold text-[22px]" style={{ color: c.textPrimary }}>{activeSection.label}</p>
              {renderClose(() => setOpenKey(null), "Закрыть подменю")}
            </div>
            <div className="overflow-y-auto" style={{ padding: "0 16px 20px" }}>
              {activeSection.isMonitor ? (
                <MonitorsPanel dark={dark} />
              ) : activeSection.columns ? (
                <div className="flex gap-[10px]">
                  {activeSection.columns.map((col, ci) => (
                    <div key={ci} className="flex-1 flex flex-col gap-[10px]">
                      {col.map((leaf, li) => renderLeaf(leaf, `${ci}-${li}`))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-[10px]">
                  {activeSection.leaves!.map((leaf, li) => renderLeaf(leaf, String(li)))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Category tab definitions matching Figma exactly
const CATS = [
  { id: "all",      label: "Все товары",  left: 115, width: 127 },
  { id: "tickets",  label: "Билеты",      left: 264, width: 110 },
  { id: "accounts", label: "Счета",       left: 396, width: 100 },
  { id: "cards",    label: "Карты",       left: 518, width: 104 },
  { id: "schedule", label: "Расписание",  left: 644, width: 150 },
];

function TopBar({ dark, adminMode, onAdminToggle, activeCategory, onCategoryChange }: {
  dark: boolean; adminMode: boolean; onAdminToggle: () => void;
  activeCategory: string; onCategoryChange: (id: string) => void;
}) {
  const c = th(dark);
  return (
    <>
      {/* Search */}
      <div className="absolute left-[115px] top-[17px] h-[52px] w-[498px] rounded-[10px] flex items-center px-4 cursor-text transition-shadow hover:shadow-sm duration-150"
        style={{ backgroundColor: c.searchBg }}>
        <span className="flex-1 text-[14px] font-normal select-none opacity-50" style={{ color: c.textSec }}>
          Искать события, артисты, места
        </span>
        <IconSearch color={dark ? "rgba(250,250,249,0.4)" : "#B9BBB8"} />
      </div>
      {/* Filter */}
      <div className="absolute left-[629px] top-[17px] w-[58px] h-[52px] rounded-[10px] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-md active:shadow-sm duration-150"
        style={{ backgroundColor: c.filterBg }}>
        <IconFilter color={dark ? "#ffffff" : "#303030"} />
      </div>
      {/* Admin toggle (fixed position from Figma) */}
      <AdminToggle on={adminMode} onToggle={onAdminToggle} dark={dark} />
      {/* Category tabs — exact Figma positions */}
      {CATS.map((cat) => {
        const active = cat.id === activeCategory;
        return (
          <button key={cat.id} onClick={() => onCategoryChange(cat.id)}
            className={["absolute top-[97px] h-[58px] text-[16px] rounded-[10px] transition-all duration-150 cursor-pointer select-none whitespace-nowrap px-4",
              active ? "bg-[#47d465] text-white font-semibold hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
                     : "font-normal hover:opacity-80 active:scale-[0.98]",
            ].join(" ")}
            style={{ left: cat.left, width: cat.width, ...(!active ? { backgroundColor: c.searchBg, color: c.textSec } : {}) }}>
            {cat.label}
          </button>
        );
      })}
    </>
  );
}

function IconPlus({ color = "white" }: { color?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-5">
      <path d="M12 5V19" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
      <path d="M5 12H19" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </svg>
  );
}

function ProductCard({ product, dark, onClick, onLongPressAdd }: { product: Product; dark: boolean; onClick: (p: Product) => void; onLongPressAdd?: (p: Product) => void }) {
  const isColoredCard = product.bg !== "#ffffff";
  const bg = dark && !isColoredCard ? th(dark).productCard : product.bg;
  // Colored cards keep a light pastel bg in both themes, so their text stays dark for contrast.
  const textColor = isColoredCard ? "#2b2b2b" : (dark ? "#f0f0f0" : "#2b2b2b");

  return (
    <div onClick={() => onClick(product)}
      className="relative h-[146px] w-[227px] rounded-[10px] overflow-hidden cursor-pointer select-none transition-all duration-150 hover:scale-[1.025] hover:shadow-md active:scale-[0.97] active:shadow-sm"
      style={{ backgroundColor: bg }}>
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "19px 15px 21px 12px" }}>
        <p className="text-[18px] font-semibold leading-[1.25] w-[200px]" style={{ color: textColor }}>{product.name}</p>
        <div className="flex items-end justify-between">
          <p className="text-[18px] font-extrabold leading-[1.25]" style={{ color: textColor, fontFeatureSettings: '"lnum","pnum"' }}>
            {product.priceLabel ?? `${product.price} ₽`}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onLongPressAdd?.(product); }}
            aria-label="Указать количество"
            className="flex items-center justify-center size-[40px] rounded-[10px] shrink-0 cursor-pointer transition-all duration-150 hover:opacity-80 active:opacity-60 active:scale-[0.92] select-none"
            style={{ backgroundColor: dark && !isColoredCard ? "#ffffff" : "#2b2b2b" }}>
            <IconPlus color={dark && !isColoredCard ? "#2b2b2b" : "white"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuantityModal({ product, dark, onConfirm, onCancel }: { product: Product; dark: boolean; onConfirm: (qty: number) => void; onCancel: () => void }) {
  const [value, setValue] = useState("1");
  const c = th(dark);
  const qty = Math.max(1, parseInt(value || "1", 10) || 1);
  const step = (d: number) => setValue(String(Math.min(9999, Math.max(1, qty + d))));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      else if (e.key === "Enter") onConfirm(qty);
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); setValue(String(Math.min(9999, qty + 1))); }
      else if (e.key === "Delete") { e.preventDefault(); setValue(String(Math.max(1, qty - 1))); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qty, onCancel, onConfirm]);

  const stepBtn = "relative flex items-center justify-center h-[66px] w-[124px] rounded-[10px] cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#47d465]";

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onCancel} />
      <div className="relative rounded-[10px] transition-colors duration-300" style={{ width: 645, padding: "32px 33px 33px", backgroundColor: c.sidebarBg }}>
        <button onClick={onCancel} aria-label="Закрыть"
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40 select-none"
          style={{ right: 28, top: 28, padding: 0, background: "none", border: "none" }}>
          <IconModalClose color={dark ? "#ffffff" : "#2b2b2b"} />
        </button>
        <p className="text-[14px] truncate" style={{ color: c.textSec, maxWidth: 480 }}>{product.name}</p>
        <p className="font-bold text-[24px] text-center" style={{ color: c.textPrimary, marginTop: 6 }}>Введите количество</p>
        <div className="flex items-center" style={{ marginTop: 30, gap: 12 }}>
          <label className="flex-1 min-w-0 flex items-center rounded-[10px] cursor-text transition-shadow duration-150 focus-within:shadow-[inset_0_0_0_1.5px_#47d465]"
            style={{ backgroundColor: c.inputBg, height: 66, padding: "0 20px" }}>
            <input
              autoFocus type="text" inputMode="numeric" value={value} aria-label="Количество"
              onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
              onFocus={(e) => e.currentTarget.select()}
              className="bg-transparent outline-none text-[18px] font-semibold"
              style={{ color: c.textPrimary, width: `${Math.max(1, value.length)}ch` }}
            />
            <span className="text-[18px] font-semibold select-none" style={{ color: c.textPrimary }}>, 00</span>
          </label>
          <button onClick={() => step(-1)} aria-label="Уменьшить"
            className={`${stepBtn} ${dark ? "hover:bg-white/15 active:bg-white/20" : "hover:bg-[#ececec] active:bg-[#e0e0e0]"}`}
            style={{ backgroundColor: c.inputBg }}>
            <span className="absolute text-[8px] opacity-60" style={{ top: 8, right: 14, color: c.textSec }}>Delete</span>
            <svg viewBox="0 0 24 24" className="size-[22px]" fill="none"><path d="M5 12H19" stroke={c.textPrimary} strokeWidth="2.4" strokeLinecap="round" /></svg>
          </button>
          <span className="text-[16px] select-none" style={{ color: c.textPrimary }}>1</span>
          <button onClick={() => step(1)} aria-label="Увеличить"
            className={`${stepBtn} ${dark ? "hover:bg-white/15 active:bg-white/20" : "hover:bg-[#ececec] active:bg-[#e0e0e0]"}`}
            style={{ backgroundColor: c.inputBg }}>
            <span className="absolute text-[10px] opacity-60" style={{ top: 6, right: 14, color: c.textSec }}>+</span>
            <svg viewBox="0 0 24 24" className="size-[22px]" fill="none"><path d="M12 5V19M5 12H19" stroke={c.textPrimary} strokeWidth="2.4" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="flex" style={{ marginTop: 30, gap: 14 }}>
          <button onClick={() => onConfirm(qty)}
            className="flex-1 h-[70px] rounded-[10px] text-[16px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 hover:bg-[#47d465]/10 active:bg-[#47d465]/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465]"
            style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
            Ок
          </button>
          <button onClick={onCancel}
            className={`relative flex-1 h-[70px] rounded-[10px] text-[16px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}
            style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
            Отмена
            <span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Shared grid rhythm: a card row is 146px tall; a section label sits LABEL_GAP
// above its first row, and the next section's label sits SECTION_GAP below the
// previous row's bottom edge. Keeping these as named constants (instead of
// re-measuring one-off pixel values per section) keeps every section's spacing consistent.
const GRID_LEFTS = [115, 358, 601, 844];
const CARD_H = 146;
// Same rhythm for every section, so "Билеты"/"Счета" sit under their labels
// with the same breathing room as "Частые действия" instead of feeling cramped.
const LABEL_GAP = 24;    // label → its first row
const SECTION_GAP = 32;  // previous row's bottom edge → next section's label
const ROW_PITCH = CARD_H + 28; // 174 — matches the card height plus the row gutter

function ProductGrid({ dark, onAdd, onLongPressAdd }: { dark: boolean; onAdd: (p: Product) => void; onLongPressAdd: (p: Product) => void }) {
  const c = th(dark);

  const freqLabelTop = 187;
  const freqRowTop = freqLabelTop + LABEL_GAP;                          // 211
  const ticketsLabelTop = freqRowTop + CARD_H + SECTION_GAP;            // 389
  const ticketsRow1Top = ticketsLabelTop + LABEL_GAP;                   // 413
  const ticketsRow2Top = ticketsRow1Top + ROW_PITCH;                    // 587
  const accountsLabelTop = ticketsRow2Top + CARD_H + SECTION_GAP;       // 765
  const accountsRowTop = accountsLabelTop + LABEL_GAP;                  // 789

  const renderRow = (products: Product[], top: number) =>
    products.map((p, ci) => (
      <div key={p.id} className="absolute" style={{ top, left: GRID_LEFTS[ci] }}>
        <ProductCard product={p} dark={dark} onClick={onAdd} onLongPressAdd={onLongPressAdd} />
      </div>
    ));

  const sectionLabel = (label: string, top: number) => (
    <div className="absolute text-[16px] font-normal" style={{ left: 115, top, color: c.textSec }}>{label}</div>
  );

  return (
    <>
      {sectionLabel("Частые действия", freqLabelTop)}
      {renderRow(PRODUCTS.slice(0, 4), freqRowTop)}

      {sectionLabel("Билеты", ticketsLabelTop)}
      {renderRow(PRODUCTS.slice(4, 8), ticketsRow1Top)}
      {renderRow(PRODUCTS.slice(8, 12), ticketsRow2Top)}

      {sectionLabel("Счета", accountsLabelTop)}
      {renderRow(ACCOUNT_CARDS, accountsRowTop)}
    </>
  );
}

function ReceiptPanel({ dark, adminMode, cartItems, onClear, onDeleteItem, onCheckout, onRefund, client, onEditClient }: {
  dark: boolean; adminMode: boolean; cartItems: CartItem[]; onClear: () => void; onDeleteItem: (id: number) => void; onCheckout: () => void; onRefund: () => void;
  client?: { name: string; phone: string } | null; onEditClient?: () => void;
}) {
  const hasItems = cartItems.length > 0;
  const hasCarrierReturn = cartItems.some((i) => i.kind === "return-carrier");
  const showHeaderBlock = hasItems || !!client;
  const total = cartItems.reduce((s, i) => s + i.price, 0);
  const c = th(dark);
  const chekTop = adminMode ? 132 : 91;
  // The client card sits right under the "Чек открыт…" line when there is one;
  // with no items yet (client authorized but nothing added), it takes that spot itself.
  const clientCardTop = hasItems ? chekTop + 28 : chekTop;
  const itemsTop = client ? clientCardTop + 76 : chekTop + 36;

  return (
    <div className="absolute left-[1114px] top-0 w-[326px] h-[1024px]">
      <div className="absolute inset-0 rounded-[10px] transition-colors duration-300"
        style={{ backgroundColor: c.sidebarBg, border: `1px solid ${dark ? c.divider : "#f9f9f9"}` }} />

      {/* Title row — top-30 when empty, top-50 once there are items or a client card (per Figma) */}
      <div className="absolute flex items-center whitespace-nowrap" style={{ left: showHeaderBlock ? 18 : 16, top: showHeaderBlock ? 50 : 30, gap: 55 }}>
        <p className="text-[24px] font-bold tracking-[0.3px]" style={{ color: c.textPrimary }}>Продажа</p>
        <button onClick={hasItems ? onClear : undefined}
          className="text-[14px] font-normal underline underline-offset-2 transition-opacity duration-150"
          style={{ color: c.textSec, opacity: hasItems ? 0.5 : 0.25, cursor: hasItems ? "pointer" : "default" }}
          onMouseEnter={(e) => hasItems && ((e.target as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => hasItems && ((e.target as HTMLElement).style.opacity = "0.5")}>
          Очистить чек
        </button>
      </div>

      {/* Admin-mode warning — non-fiscal sales notice */}
      {adminMode && (
        <div className="absolute flex items-start gap-[8px] w-[280px]" style={{ left: 22, top: hasItems ? 82 : 78 }}>
          <div className="pt-[1px]"><IconWarning /></div>
          <p className="text-[14px] font-normal leading-[1.25]" style={{ color: "#F95B1C" }}>
            В режиме администратора все продажи нефискальны
          </p>
        </div>
      )}

      {/* Client card — shown as soon as a client is authorized, even before
          the first item is added, and stays regardless of cart contents. */}
      {client && (
        <div className="absolute flex items-center gap-[10px] rounded-[10px] transition-colors duration-300"
          style={{ left: 18, top: clientCardTop, width: 290, padding: 10, backgroundColor: c.inputBg }}>
          <div className="rounded-full flex items-center justify-center shrink-0 select-none"
            style={{ width: 40, height: 40, backgroundColor: "#47d465", color: "white", fontWeight: 700, fontSize: 16 }}>
            {(client.name.trim()[0] ?? "?").toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold truncate" style={{ color: c.textPrimary }}>{client.name || "Клиент"}</p>
            <p className="text-[12px] opacity-60 truncate" style={{ color: c.textSec }}>{client.phone}</p>
          </div>
          {onEditClient && (
            <button onClick={onEditClient}
              className="shrink-0 cursor-pointer transition-opacity hover:opacity-60 active:opacity-40 select-none"
              style={{ background: "none", border: "none", padding: 0 }}>
              <svg fill="none" viewBox="0 0 20 20" style={{ width: 18, height: 18 }}>
                <path d="M13.5 3.5L16.5 6.5L7 16L3.5 16.5L4 13L13.5 3.5Z" stroke={c.textSec} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      )}

      {hasItems && (
        <>
          <p className="absolute left-[22px] w-[224px] text-[14px] font-normal opacity-50 leading-[1.1]"
            style={{ top: chekTop, color: c.textSec, fontFeatureSettings: '"lnum","pnum"' }}>
            Чек открыт 26.03.26 в 13:27
          </p>

          {/* Cart items */}
          <div className="absolute left-[18px] w-[290px] flex flex-col" style={{ top: itemsTop }}>
            {cartItems.map((item, idx) => {
              const isLast = idx === cartItems.length - 1;
              return (
                <div key={item.id}>
                  <div className="relative w-full h-[100px] p-[8px]" style={{ backgroundColor: isLast ? (dark ? "#1a3d22" : "#d2f4d9") : "transparent" }}>
                    <div className="flex flex-col gap-[10px] w-[224px]">
                      <p className="text-[14px] font-normal opacity-50 leading-[1.1]"
                        style={{ color: c.textSec, fontFeatureSettings: '"lnum","pnum"' }}>
                        {item.name}
                      </p>
                      <p className="text-[16px] font-extrabold leading-[1.25]"
                        style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>
                        {item.price} ₽
                      </p>
                    </div>
                    <button onClick={() => onDeleteItem(item.id)}
                      className="absolute right-[8px] top-[8px] flex items-center justify-center size-[32px] rounded-[8px] cursor-pointer transition-all duration-150 hover:bg-black/5 active:scale-[0.9] active:opacity-60 select-none">
                      <IconTrash color={dark ? "#c9c9c7" : "#7a7a78"} />
                    </button>
                  </div>
                  {!isLast && <div className="w-full h-px" style={{ backgroundColor: c.divider }} />}
                </div>
              );
            })}
          </div>

          {/* ПОЗИЦИИ + ИТОГО */}
          <div className="absolute flex items-center justify-between"
            style={{ left: 34, top: 838, width: 259 }}>
            <span className="text-[14px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>ПОЗИЦИИ:</span>
            <span className="text-[16px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>{cartItems.length}</span>
          </div>
          <div className="absolute flex items-center justify-between"
            style={{ left: 35, top: 878, width: 258 }}>
            <span className="text-[14px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>ИТОГО:</span>
            <span className="text-[16px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>{total} ₽</span>
          </div>
        </>
      )}

      {/* Скидка % — left-34 top-906 */}
      <div
        className={`absolute flex items-center justify-center gap-[10px] rounded-[10px] select-none bg-[#303030] transition-all duration-150 ${hasItems ? "cursor-pointer hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98]" : "cursor-default"}`}
        style={{ left: 34, top: 906, width: 257, height: 46, opacity: hasItems ? 1 : 0.58 }}>
        <span className="text-[14px] font-semibold text-white">Скидка</span>
        <IconPercent />
      </div>

      {/* Расчет — left-34 top-964 */}
      <button
        onClick={hasItems ? (hasCarrierReturn ? onRefund : onCheckout) : undefined}
        className={`absolute rounded-[10px] text-[14px] font-black text-white bg-[#47d465] transition-all duration-150 select-none ${hasItems ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "cursor-default"}`}
        style={{ left: 34, top: 964, width: 258, height: 52, opacity: hasItems ? 1 : 0.58 }}>
        {hasCarrierReturn ? "Возврат" : "Расчет"}
      </button>
    </div>
  );
}

function BottomBar({ dark, onClientInfo, onAction }: { dark: boolean; onClientInfo?: () => void; onAction?: (a: MenuAction) => void }) {
  const c = th(dark);
  const darkBtn = "absolute flex items-center justify-center text-[14px] font-semibold text-white rounded-[10px] bg-[#303030] cursor-pointer transition-all duration-150 hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98] select-none";

  return (
    <>
      {/* White bottom bar container — left-82 top-944 w-1023 h-80 */}
      <div className="absolute left-[82px] top-[944px] w-[1023px] h-[80px] rounded-[10px] transition-colors duration-300"
        style={{ backgroundColor: c.bottomBarBg }} />

      {/* Action buttons at top-961 */}
      <button onClick={() => onAction?.("returnCard")} className={`${darkBtn} left-[94px] top-[961px] w-[155px] h-[46px]`}>
        Возврат по карте
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">Backspace</span>
      </button>
      <button onClick={() => onAction?.("returnCheck")} className={`${darkBtn} left-[257px] top-[961px] w-[147px] h-[46px]`}>
        Возврат по чеку
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">Alt+Backspace</span>
      </button>
      <button onClick={onClientInfo} className={`${darkBtn} left-[412px] top-[961px] w-[188px] h-[46px]`}>
        Информация по карте
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">F1</span>
      </button>
      <button onClick={() => onAction?.("debts")} className={`${darkBtn} left-[608px] top-[961px] w-[148px] h-[46px]`}>
        Гашение долгов
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">F8</span>
      </button>
      <div className={`${darkBtn} left-[764px] top-[961px] w-[177px] h-[46px]`}>Печать последних QR</div>
      <div className={`${darkBtn} left-[949px] top-[961px] w-[144px] h-[46px]`}>Печать прочека</div>
    </>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

type PayMethod = "cash" | "card" | "deposit" | "bonus";

const PAY_METHODS: { key: PayMethod; label: string }[] = [
  { key: "cash",    label: "Наличные" },
  { key: "card",    label: "Безналичные" },
  { key: "deposit", label: "Депозит" },
];

const BONUS_BALANCE = 500;

interface PayRow { id: number; method: PayMethod | null; amount: number; }
let payRowId = 0;

function IconCash({ selected }: { selected: boolean }) {
  const c = selected ? "white" : "#2B2B2B";
  return (
    <svg fill="none" viewBox="0 0 14.238 15.64" className="w-[14px] h-[16px]">
      <path clipRule="evenodd" d={svgPayment.p3f058e00} fill={c} fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPayment.p27692d8c} fill={c} fillRule="evenodd" />
      <path d={svgPayment.p292b8f00} fill={selected ? "#a9e9e0" : "#E64646"} />
    </svg>
  );
}

function IconCreditCard({ selected }: { selected: boolean }) {
  const c = selected ? "white" : "#2B2B2B";
  return (
    <svg fill="none" viewBox="0 0 15 11.25" className="w-[15px]">
      <path d={svgPayment.p258e7000} fill="#DCCCFF" />
      <path d={svgPayment.p3673a100} fill={c} />
    </svg>
  );
}

function IconHeart({ selected }: { selected: boolean }) {
  const c = selected ? "white" : "#2B2B2B";
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]">
      <path d="M12 20.5C12 20.5 3 15 3 8.9C3 5.9 5.4 4 8 4C9.8 4 11.2 5 12 6.3C12.8 5 14.2 4 16 4C18.6 4 21 5.9 21 8.9C21 15 12 20.5 12 20.5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

// × that appears in payment row — orange skewed cross (p151d7c00 from Расчет12)
const ROW_REMOVE_PATH = "M8.01832 5.72738L8.09993 0.0816237L5.84163 0.114267L5.76002 5.76002L0.114267 5.84163L0.0816237 8.09993L5.72738 8.01832L5.64577 13.6641L7.90407 13.6314L7.98568 7.98568L13.6314 7.90407L13.6641 5.64577L8.01832 5.72738Z";

function IconRowRemove() {
  return (
    <div className="flex items-center justify-center" style={{ width: 18.816, height: 20.043 }}>
      <div style={{ transform: "rotate(-46.81deg) skewX(-3.62deg)" }}>
        <svg fill="none" viewBox="0 0 13.746 13.746" style={{ width: 13.746, height: 13.746 }}>
          <path d={ROW_REMOVE_PATH} fill="#F95B1C" />
        </svg>
      </div>
    </div>
  );
}

// Close button × — dark, larger, from Group import
function IconModalClose({ color = "#303030" }: { color?: string }) {
  return (
    <div style={{ width: 32.345, height: 41.377, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-51.98deg) scaleY(0.97) skewX(-13.97deg)" }}>
        <svg fill="none" viewBox="0 0 26.26 26.26" style={{ width: 26.259, height: 26.259 }}>
          <path d={svgClose.p2deb47f0} fill={color} />
        </svg>
      </div>
    </div>
  );
}

function PaymentModal({ cartTotal, dark, onConfirm, onCancel }: {
  cartTotal: number;
  dark: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const c = th(dark);
  const [rows, setRows] = useState<PayRow[]>(() => [{ id: payRowId++, method: null, amount: cartTotal }]);
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [inn, setInn] = useState("");
  const [noPrint, setNoPrint] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const rowsRef = useRef<HTMLDivElement>(null);

  const enteredSum = rows.reduce((s, r) => s + (r.amount || 0), 0);
  const doplata = Math.max(0, cartTotal - enteredSum);
  const change = Math.max(0, enteredSum - cartTotal);
  const bonusUsed = rows.filter((r) => r.method === "bonus").reduce((s, r) => s + r.amount, 0);
  const bonusRemaining = Math.max(0, BONUS_BALANCE - bonusUsed);
  const bonusOn = rows.some((r) => r.method === "bonus");
  const activeRow = rows[rows.length - 1];
  const canAssign = !!activeRow && activeRow.method === null;
  const canConfirm = doplata === 0 && rows.every((r) => r.method !== null);
  // last row that has a real payment method — drives which button is highlighted green
  const lastMethodRow = [...rows].reverse().find((r) => r.method !== null && r.method !== "bonus");

  const setAmount = (id: number, amount: number) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, amount } : r)));

  const assignMethod = (id: number, method: PayMethod) => {
    const wasOnlyRow = rows.length === 1;
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    const amount = method === "bonus" ? Math.min(target.amount, bonusRemaining) : target.amount;
    const updated = rows.map((r) => (r.id === id ? { ...r, method, amount } : r));
    const sum = updated.reduce((s, r) => s + r.amount, 0);
    const remainder = Math.max(0, cartTotal - sum);
    const final = remainder > 0 ? [...updated, { id: payRowId++, method: null, amount: remainder }] : updated;
    setRows(final);
    if (remainder === 0 && wasOnlyRow) setTimeout(onConfirm, 500);
  };

  const removeRow = (id: number) => {
    setRows((prev) => {
      const next = prev.filter((r) => r.id !== id);
      if (next.length === 0) return [{ id: payRowId++, method: null, amount: cartTotal }];
      const sum = next.reduce((s, r) => s + r.amount, 0);
      const remainder = Math.max(0, cartTotal - sum);
      const lastSettled = next[next.length - 1].method !== null;
      return remainder > 0 && lastSettled ? [...next, { id: payRowId++, method: null, amount: remainder }] : next;
    });
  };

  const toggleBonus = () => {
    if (bonusOn || !canAssign || bonusRemaining <= 0) return;
    assignMethod(activeRow.id, "bonus");
  };

  const handleConfirm = () => { if (canConfirm) onConfirm(); };

  const onRowScroll = () => {
    const el = rowsRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollRatio(max > 0 ? el.scrollTop / max : 0);
  };

  const ROWS_TOP = 419;
  const ROWS_MAX_H = 220;
  const TRACK_H = 393;
  const rowsTotalH = Math.max(1, rows.length * 64);
  const visibleRatio = Math.min(1, ROWS_MAX_H / rowsTotalH);
  const THUMB_H = Math.max(30, Math.round(TRACK_H * visibleRatio));
  const thumbTop = Math.round(scrollRatio * (TRACK_H - THUMB_H));

  const inputCls = "w-full rounded-[10px] px-4 py-[18px] text-[14px] font-normal outline-none focus:ring-2 focus:ring-[#47d465]/30 transition-shadow";

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 50 }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onCancel} />

      {/* Dialog */}
      <div
        className="relative rounded-[10px] transition-colors duration-300 overflow-hidden"
        style={{ width: 1091, height: 813, backgroundColor: c.sidebarBg }}
      >
        {/* Close button × — top right */}
        <button onClick={onCancel}
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40 select-none"
          style={{ right: 15.71, top: 8, padding: 0, background: "none", border: "none" }}>
          <IconModalClose color={dark ? "#f0f0f0" : "#303030"} />
        </button>

        {/* Title */}
        <p className="absolute font-bold text-[24px] left-[35px] top-[26px]" style={{ color: c.textPrimary }}>Расчет</p>

        {/* Section labels */}
        <p className="absolute font-medium text-[16px]" style={{ left: 44, top: 91, color: c.textSec }}>Личные данные</p>
        <p className="absolute font-medium text-[16px]" style={{ left: 610, top: 91, color: c.textSec }}>Процессинги</p>

        {/* Bonus toggle — top right */}
        <div className="absolute flex items-center gap-[10px]" style={{ right: 40, top: 89 }}>
          <span className="text-[13px] whitespace-nowrap" style={{ color: c.textSec }}>
            {`Списать бонусы (всего ${bonusRemaining} ₽)`}
          </span>
          <button onClick={toggleBonus}
            className="relative shrink-0 transition-colors duration-200 select-none"
            style={{
              width: 40.6, height: 24, borderRadius: 17.5,
              backgroundColor: bonusOn ? "#47d465" : "#a4a4a4",
              opacity: !bonusOn && (!canAssign || bonusRemaining <= 0) ? 0.4 : 1,
              cursor: !bonusOn && (!canAssign || bonusRemaining <= 0) ? "default" : "pointer",
              border: "none", padding: 0,
            }}>
            <div className="absolute transition-all duration-200"
              style={{ top: "11.54%", bottom: "11.54%", width: "45.36%", borderRadius: "50%", backgroundColor: "white", left: bonusOn ? "47.73%" : "8.9%" }} />
          </button>
        </div>

        {/* Left: personal data inputs */}
        <div className="absolute flex flex-col gap-[14px]" style={{ left: 35, top: 113, width: 552 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail/Номер телефона" className={inputCls} style={{ backgroundColor: c.inputBg, color: c.textPrimary }} />
          <input value={org} onChange={(e) => setOrg(e.target.value)}
            placeholder="Организация" className={inputCls} style={{ backgroundColor: c.inputBg, color: c.textPrimary }} />
          <input value={inn} onChange={(e) => setInn(e.target.value)}
            placeholder="ИНН организации" className={inputCls} style={{ backgroundColor: c.inputBg, color: c.textPrimary }} />
          <button onClick={() => setNoPrint((v) => !v)}
            className="flex items-center gap-[16px] px-[5px] cursor-pointer select-none transition-opacity hover:opacity-80 active:opacity-60">
            <div className="relative size-[20px] shrink-0 rounded-[3.5px] transition-all duration-150"
              style={{ backgroundColor: noPrint ? "#47D465" : "transparent", border: noPrint ? "1px solid #47D465" : "1px solid #c0c0c0" }}>
              {noPrint && (
                <svg viewBox="0 0 20 20" className="absolute inset-0 size-full" fill="none">
                  <path d="M4 8.90909L9.05556 14L17 6" stroke="white" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <span className="text-[14px] font-normal" style={{ color: c.textSec }}>Не печатать чек</span>
          </button>
        </div>

        {/* "Продажи" label */}
        <p className="absolute font-medium text-[16px]" style={{ left: 40, top: 378, color: c.textSec }}>Продажи</p>

        {/* Scrollable rows frame — inside "Продажи" */}
        <div
          ref={rowsRef}
          onScroll={onRowScroll}
          className="absolute flex flex-col gap-[8px] overflow-y-auto pr-[40px]"
          style={{ left: "3.21%", right: "5.13%", top: ROWS_TOP, maxHeight: ROWS_MAX_H, scrollbarWidth: "none" }}
        >
          {rows.map((row) => {
            const label = row.method === null ? "Сумма" : row.method === "bonus" ? "Бонусы" : PAY_METHODS.find((m) => m.key === row.method)!.label;
            return (
              <div key={row.id}
                className="flex items-center rounded-[10px] px-4 shrink-0 transition-shadow hover:shadow-sm"
                style={{ height: 56, gap: 24, backgroundColor: c.inputBg }}>
                <span className="text-[14px] font-normal shrink-0" style={{ width: 110, color: c.textSec }}>
                  {label}
                </span>
                <div className="relative shrink-0 rounded-[7px] flex items-center px-2"
                  style={{ width: 106, height: 40, border: "1px solid rgba(43,43,43,0.2)", backgroundColor: c.sidebarBg }}>
                  <input
                    value={String(row.amount)}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d]/g, "");
                      setAmount(row.id, val === "" ? 0 : parseInt(val, 10));
                    }}
                    className="bg-transparent text-[14px] font-bold outline-none text-right min-w-0 flex-1"
                    style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}
                  />
                  <span className="text-[14px] font-normal ml-[2px] shrink-0" style={{ color: c.textPrimary }}>₽</span>
                </div>
                <div className="flex-1" />
                {/* × remove */}
                <button onClick={() => removeRow(row.id)}
                  className="cursor-pointer transition-opacity hover:opacity-70 active:opacity-40 shrink-0 select-none"
                  style={{ background: "none", border: "none", padding: 0 }}>
                  <IconRowRemove />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom scrollbar */}
        <div className="absolute" style={{ left: 1058, top: 421, width: 0, height: TRACK_H }}>
          <div className="absolute" style={{ inset: "-0.25% -1px 0 -1px" }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 187">
              <path d="M1 1L1 186" stroke="#E5E5E5" strokeLinecap="round" strokeWidth="2" />
              <path
                d={`M1 ${1 + Math.round(thumbTop * 186 / TRACK_H)}L1 ${1 + Math.round((thumbTop + THUMB_H) * 186 / TRACK_H)}`}
                stroke="#47D465" strokeLinecap="round" strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Right: processing option buttons */}
        <div className="absolute flex flex-col gap-[11px]" style={{ left: 609, top: 113, width: 431 }}>
          {PAY_METHODS.map((opt) => {
            const isActive = lastMethodRow?.method === opt.key;
            return (
              <button key={opt.key} onClick={() => canAssign && assignMethod(activeRow.id, opt.key)}
                disabled={!canAssign}
                className={[
                  "h-[56px] w-full rounded-[10px] flex items-center justify-center gap-[10px] text-[16px] font-semibold select-none transition-all duration-150",
                  isActive
                    ? "bg-[#47d465] text-white hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98] cursor-pointer"
                    : canAssign
                      ? "hover:bg-black/5 active:scale-[0.98] cursor-pointer"
                      : "opacity-40 cursor-default",
                ].join(" ")}
                style={{ color: isActive ? "white" : c.textPrimary, ...(!isActive ? { boxShadow: "inset 0 0 0 1px #47d465" } : {}) }}>
                {opt.key === "cash"    && <IconCash selected={isActive} />}
                {opt.key === "card"    && <IconCreditCard selected={isActive} />}
                {opt.key === "deposit" && <IconHeart selected={isActive} />}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Summary bar — Итого / Доплата / Сдача */}
        <div className="absolute flex items-center justify-between text-[16px] font-medium whitespace-nowrap"
          style={{ left: 40, right: 40, bottom: 158, color: c.textSec }}>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Итого "}<span className="font-bold" style={{ color: c.textPrimary }}>{cartTotal} ₽</span>
          </p>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Доплата "}<span className="font-bold" style={{ color: c.textPrimary }}>{doplata} ₽</span>
          </p>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Сдача "}<span className="font-bold" style={{ color: c.textPrimary }}>{change} ₽</span>
          </p>
        </div>

        {/* Divider */}
        <div className="absolute left-0 right-0 h-px" style={{ bottom: 113, backgroundColor: c.divider }} />

        {/* Bottom buttons */}
        <div className="absolute flex items-center gap-[17px]"
          style={{ bottom: 29, left: "50%", transform: "translateX(-50%)" }}>
          <button onClick={handleConfirm}
            className={[
              "w-[360px] h-[56px] rounded-[10px] text-[16px] font-semibold text-white bg-[#47d465] select-none transition-all duration-150",
              canConfirm
                ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
                : "opacity-50 cursor-default",
            ].join(" ")}>
            Расчет
          </button>
          <button onClick={onCancel}
            className="w-[360px] h-[56px] rounded-[10px] text-[14px] font-semibold cursor-pointer select-none transition-all duration-150 hover:bg-black/5 active:scale-[0.98]"
            style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1px #47d465" }}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Registration Screen ──────────────────────────────────────────────────────

const today = new Date();

const MONTHS_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const CATEGORY_OPTIONS  = ["VIP","Стандарт","Корпоративный","Детский","Льготный"];
const GENDER_OPTIONS    = ["Мужской","Женский","Не указан"];
const VISIT_OPTIONS     = ["Индивидуальное","Групповое","Корпоративное","Семейное"];
const RELATION_OPTIONS  = ["Семья","Ребёнок","Родитель","Супруг(а)","Родственник","Другое"];

// — Chevron icon (from svgReg paths)
function RegChevron({ open }: { open: boolean }) {
  return (
    <svg fill="none" viewBox="0 0 7.29 13.41" style={{ width: 14, height: 14, flexShrink: 0, transform: open ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.15s" }}>
      <path d={svgReg.p3b290f00} fill="#252422" />
    </svg>
  );
}

// — Calendar icon
function CalendarIcon() {
  return (
    <svg fill="none" viewBox="0 0 20 20" style={{ width: 20, height: 20, flexShrink: 0 }}>
      <path d={svgReg.p33891380} fill="#303030" />
      <path d={svgReg.p152da500} fill="#47D465" />
    </svg>
  );
}

// — Paperclip icon
function PaperclipIcon() {
  return (
    <svg fill="none" viewBox="0 0 21.44 22.61" style={{ width: 19, height: 20, flexShrink: 0 }}>
      <path d={svgReg.p2e9c59d8} stroke="#2B2B2B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

// — Landscape placeholder icon
function LandscapeIcon() {
  return (
    <svg fill="none" viewBox="0 0 57 57" style={{ width: 57, height: 57 }}>
      <path d={svgReg.p2b2ce880} fill="#E0E4E1" />
      <path d={svgReg.p2f489280} fill="#E0E4E1" />
      <path d={svgReg.p37407c00} fill="#E0E4E1" />
      <path d={svgReg.p14d17f00} fill="#E0E4E1" />
      <path d={svgReg.p5d44b00}  fill="#E0E4E1" />
      <path d={svgReg.p46d1900}  fill="#E0E4E1" />
    </svg>
  );
}

// — Mini calendar popup
function MiniCalendar({ value, onChange, onClose }: { value: string; onChange: (v: string) => void; onClose: () => void }) {
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const offset   = firstDay === 0 ? 6 : firstDay - 1; // Mon-first offset
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  const cells: { day: number; cur: boolean }[] = [];
  for (let i = offset; i > 0; i--) cells.push({ day: daysInPrev - i + 1, cur: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, cur: true });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - offset + 1, cur: false });

  const isSelected = (d: number, cur: boolean) => {
    if (!cur || !value) return false;
    const [dd, mm, yyyy] = value.split(".");
    return parseInt(dd) === d && parseInt(mm) === month + 1 && parseInt(yyyy) === year;
  };
  const isToday = (d: number, cur: boolean) =>
    cur && d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const pick = (d: number) => {
    const dd   = String(d).padStart(2, "0");
    const mm   = String(month + 1).padStart(2, "0");
    onChange(`${dd}.${mm}.${year}`);
    onClose();
  };

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="absolute bg-white rounded-[10px] shadow-lg z-50 p-3 select-none"
      style={{ top: "calc(100% + 4px)", left: 0, width: 246, border: "1px solid #e5e5e5" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f0f0f0] active:bg-[#e0e0e0] transition-colors cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}>
          <svg fill="none" viewBox="0 0 7.29 13.41" style={{ width: 10, height: 10, transform: "rotate(180deg)" }}>
            <path d={svgReg.p3b290f00} fill="#303030" />
          </svg>
        </button>
        <span className="text-[13px] font-semibold text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
          {MONTHS_RU[month]} {year}
        </span>
        <button onClick={nextMonth}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f0f0f0] active:bg-[#e0e0e0] transition-colors cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}>
          <svg fill="none" viewBox="0 0 7.29 13.41" style={{ width: 10, height: 10 }}>
            <path d={svgReg.p3b290f00} fill="#303030" />
          </svg>
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map(d => (
          <div key={d} className="text-center text-[11px] font-medium text-[#a0a0a0] py-0.5"
            style={{ fontFamily: "Raleway, sans-serif" }}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((c, i) => {
          const sel = isSelected(c.day, c.cur);
          const tod = isToday(c.day, c.cur);
          return (
            <button key={i} onClick={() => c.cur && pick(c.day)} disabled={!c.cur}
              className={[
                "h-7 w-full text-center text-[12px] rounded-[6px] transition-colors cursor-pointer",
                !c.cur ? "text-[#c0c0c0] cursor-default" : "",
                sel    ? "bg-[#47d465] text-white font-semibold" : "",
                tod && !sel ? "text-[#47d465] font-semibold" : "",
                c.cur && !sel ? "hover:bg-[#f0fdf4] active:bg-[#dcfce7]" : "",
              ].join(" ")}
              style={{ fontFamily: "Raleway, sans-serif", background: sel ? "#47d465" : undefined, border: "none", padding: 0 }}>
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// — Dropdown field
function RegDropdown({ label, required, placeholder, value, options, open, onToggle, onSelect }: {
  label: string; required?: boolean; placeholder: string; value: string;
  options: string[]; open: boolean; onToggle: () => void; onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[6px] w-full relative">
      <div className="text-[14px] font-normal text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
        {label}{required && <span className="text-[#f95b1c]">*</span>}
      </div>
      <button onClick={onToggle}
        className={[
          "flex items-center gap-[10px] px-[16px] py-[18px] rounded-[10px] w-full text-left transition-all duration-150 cursor-pointer",
          open ? "bg-[#f0f0f0] ring-2 ring-[#47d465]/30" : "bg-[#f9f9f9] hover:bg-[#f0f0f0] active:bg-[#e8e8e8]",
        ].join(" ")}
        style={{ border: "none", padding: "18px 16px", height: 56 }}>
        <span className={["flex-1 text-[16px] font-normal", value ? "text-[#252422]" : "text-[#252422] opacity-50"].join(" ")}
          style={{ fontFamily: "Raleway, sans-serif" }}>
          {value || placeholder}
        </span>
        <RegChevron open={open} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-[10px] shadow-lg z-40 overflow-hidden mt-1"
          style={{ border: "1px solid #e5e5e5" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => onSelect(opt)}
              className={[
                "w-full text-left px-[16px] py-[12px] text-[15px] font-normal transition-colors cursor-pointer",
                opt === value ? "bg-[#d2f4d9] text-[#252422]" : "text-[#252422] hover:bg-[#f5f5f5] active:bg-[#ebebeb]",
              ].join(" ")}
              style={{ fontFamily: "Raleway, sans-serif", border: "none" }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// — Text input field
function RegTextField({ label, required, placeholder, value, onChange, suffix, readOnly }: {
  label: string; required?: boolean; placeholder: string; value: string;
  onChange?: (v: string) => void; suffix?: React.ReactNode; readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div className="text-[14px] font-normal text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
        {label}{required && <span className="text-[#f95b1c]">*</span>}
      </div>
      <div className={[
        "flex items-center gap-[10px] px-[16px] rounded-[10px] w-full transition-all duration-150",
        readOnly ? "bg-[#f9f9f9]" : "bg-[#f9f9f9] focus-within:ring-2 focus-within:ring-[#47d465]/30 hover:bg-[#f0f0f0]",
      ].join(" ")} style={{ height: 56 }}>
        {readOnly ? (
          <span className="flex-1 text-[16px] font-normal text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
            {value}
          </span>
        ) : (
          <input
            value={value}
            onChange={e => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[16px] font-normal text-[#252422] outline-none placeholder:opacity-50"
            style={{ fontFamily: "Raleway, sans-serif", border: "none" }}
          />
        )}
        {suffix}
      </div>
    </div>
  );
}

// — Date picker field
function RegDateField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[6px] relative" style={{ width: 246 }}>
      <div className="text-[14px] font-normal text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
        Дата рождения
      </div>
      <button onClick={() => setOpen(o => !o)}
        className={[
          "flex items-center gap-[10px] px-[16px] rounded-[10px] transition-all duration-150 cursor-pointer",
          open ? "bg-[#f0f0f0] ring-2 ring-[#47d465]/30" : "bg-[#f9f9f9] hover:bg-[#f0f0f0] active:bg-[#e8e8e8]",
        ].join(" ")}
        style={{ height: 56, border: "none", width: 246 }}>
        <span className={["flex-1 text-left text-[16px] font-normal", value ? "text-[#252422]" : "text-[#252422] opacity-50"].join(" ")}
          style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          {value || "__.__.____"}
        </span>
        <CalendarIcon />
      </button>
      {open && (
        <MiniCalendar value={value} onChange={onChange} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

// — Checkbox
function RegCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!checked)}
      className="flex items-center gap-[18px] cursor-pointer select-none transition-opacity hover:opacity-80 active:opacity-60"
      style={{ background: "none", border: "none", padding: 0 }}>
      <div className="relative shrink-0 rounded-[4px] transition-all duration-150"
        style={{ width: 20, height: 20, border: checked ? "1px solid #47d465" : "1px solid #c0c0c0", backgroundColor: checked ? "#47d465" : "white" }}>
        {checked && (
          <svg viewBox="0 0 20 20" className="absolute inset-0 w-full h-full" fill="none">
            <path d="M4 9.5L8.5 14L16.5 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-[14px] font-normal text-[#303030]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
        {label}
      </span>
    </button>
  );
}

// — Guest card (right panel)
interface GuestEntry {
  id: number;
  name: string;
  category: string;
  birthdate: string;
  gender: string;
  phone: string;
  email: string;
  relationType: string;
  selectedForVisit: boolean;
  visitCount: number;
}
let guestIdCounter = 1;

function GuestCard({ guest, onEdit, onToggleVisit }: {
  guest: GuestEntry;
  onEdit: () => void;
  onToggleVisit: () => void;
}) {
  return (
    <div className="relative bg-[#fbfbfb] rounded-[10px] overflow-hidden transition-shadow hover:shadow-sm"
      style={{ height: 82, width: "100%" }}>
      {/* Blue avatar circle */}
      <div className="absolute rounded-full bg-[#4dd0ff]"
        style={{ left: 71, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, opacity: 0.1 }} />
      {/* Checkbox (select for visit) */}
      <button onClick={onToggleVisit}
        className="absolute cursor-pointer transition-opacity hover:opacity-80 active:opacity-60"
        style={{ left: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", padding: 0 }}>
        <div className="relative rounded-[3.5px] transition-all duration-150"
          style={{ width: 20, height: 20, backgroundColor: guest.selectedForVisit ? "#47D465" : "white", border: guest.selectedForVisit ? "1px solid #47D465" : "1px solid #c0c0c0" }}>
          {guest.selectedForVisit && (
            <svg viewBox="0 0 20 20" className="absolute inset-0 w-full h-full" fill="none">
              <path d="M4 8.90909L9.05556 14L17 6" stroke="white" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      </button>
      {/* Name + birthdate */}
      <div className="absolute" style={{ left: 126, top: 18, width: 89 }}>
        <div className="text-[18px] font-semibold text-[#2b2b2b] truncate"
          style={{ fontFamily: "Raleway, sans-serif" }}>
          {guest.name || "Гость"}
        </div>
        <div className="text-[14px] font-normal text-[#252422]"
          style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          {guest.birthdate || "__.__.____"}
        </div>
      </div>
      {/* Visit count + relation */}
      <div className="absolute text-[14px] font-normal text-[#252422]"
        style={{ left: 234, top: 25, fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"', lineHeight: 1.1 }}>
        <p>Посещений: {guest.visitCount}</p>
        <p style={{ marginTop: 4 }}>Тип связи: {guest.relationType || "—"}</p>
      </div>
      {/* "Выдать карту" pill */}
      <div className="absolute bg-[#47d465] rounded-[33px] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#3dc05a] active:bg-[#30a84a]"
        style={{ left: 384, top: 22, width: 143, height: 40 }}>
        <span className="text-[16px] font-semibold text-white text-center whitespace-nowrap"
          style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          Выдать карту
        </span>
      </div>
      {/* Pencil edit icon */}
      <button onClick={onEdit}
        className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
        style={{ left: 546, top: 31, width: 20, height: 20, background: "none", border: "none", padding: 0 }}>
        <svg fill="none" viewBox="0 0 20 20" style={{ width: 20, height: 20 }}>
          <path d={svgNewData.p36cac440} fill="#777777" />
        </svg>
      </button>
    </div>
  );
}

// — New guest overlay modal (slides in from right edge)
function NewGuestModal({ initial, onSave, onCancel }: {
  initial?: Partial<GuestEntry>;
  onSave: (g: Omit<GuestEntry, "id" | "visitCount" | "selectedForVisit">) => void;
  onCancel: () => void;
}) {
  const [relationType, setRelationType]   = useState(initial?.relationType ?? "");
  const [relationOpen, setRelationOpen]   = useState(false);
  const [category, setCategory]           = useState(initial?.category ?? "");
  const [catOpen, setCatOpen]             = useState(false);
  const [name, setName]                   = useState(initial?.name ?? "");
  const [phone, setPhone]                 = useState(initial?.phone ?? "");
  const [email, setEmail]                 = useState(initial?.email ?? "");
  const [birthdate, setBirthdate]         = useState(initial?.birthdate ?? "");
  const [calOpen, setCalOpen]             = useState(false);
  const [gender, setGender]               = useState(initial?.gender ?? "");
  const [genderOpen, setGenderOpen]       = useState(false);

  const closeAllDropdowns = () => { setRelationOpen(false); setCatOpen(false); setGenderOpen(false); setCalOpen(false); };
  const canSave = Boolean(category && name.trim());

  const handleSave = () => {
    if (!canSave) return;
    onSave({ name, category, birthdate, gender, phone, email, relationType });
  };

  return (
    <>
      {/* Dimmed overlay behind the panel */}
      <div className="absolute inset-0 bg-[#403e3e]" style={{ opacity: 0.41 }} onClick={onCancel} />
      {/* Slide-in panel — matches Figma Component3: left-812 w-628 h-1024 rounded-tl-10 rounded-bl-10 */}
      <div className="absolute bg-white rounded-tl-[10px] rounded-bl-[10px] flex flex-col"
        style={{ left: 812, top: 0, width: 628, height: 1024 }}
        onClick={e => e.stopPropagation()}>
        {/* Title */}
        <p className="absolute font-semibold text-[18px] text-[#252422]"
          style={{ left: 35, top: 37, fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          Добавить гостя
        </p>
        {/* Photo placeholder */}
        <div className="absolute" style={{ left: 551, top: 16 }}>
          <LandscapeIcon />
        </div>

        {/* Тип связи dropdown */}
        <div className="absolute" style={{ left: 35, top: 84, width: 507 }}>
          <RegDropdown label="Тип связи" placeholder="Укажите тип связи"
            value={relationType} options={RELATION_OPTIONS}
            open={relationOpen}
            onToggle={() => { const n = !relationOpen; closeAllDropdowns(); setRelationOpen(n); }}
            onSelect={v => { setRelationType(v); setRelationOpen(false); }}
          />
        </div>

        {/* Fields: Категория*, Обращение*, Телефон*, E-mail* */}
        <div className="absolute flex flex-col gap-[16px]" style={{ left: 35, top: 182, width: 507 }}>
          <RegDropdown label="Категория" required placeholder="Выберите категорию"
            value={category} options={CATEGORY_OPTIONS}
            open={catOpen}
            onToggle={() => { const n = !catOpen; closeAllDropdowns(); setCatOpen(n); }}
            onSelect={v => { setCategory(v); setCatOpen(false); }}
          />
          <RegTextField label="Обращение" required placeholder="Введите имя/фамилию гостя"
            value={name} onChange={setName} />
          <RegTextField label="Номер телефона" required placeholder="+7 (___) ___-__-__"
            value={phone} onChange={setPhone} />
          <RegTextField label="E-mail" required placeholder="example@mail.com"
            value={email} onChange={setEmail} />
        </div>

        {/* Дата рождения + Пол */}
        <div className="absolute flex gap-[15px] items-start" style={{ left: 35, top: 569 }}>
          <RegDateField value={birthdate} onChange={setBirthdate} />
          <div style={{ width: 246 }}>
            <RegDropdown label="Пол" placeholder="" value={gender} options={GENDER_OPTIONS}
              open={genderOpen}
              onToggle={() => { const n = !genderOpen; closeAllDropdowns(); setGenderOpen(n); }}
              onSelect={v => { setGender(v); setGenderOpen(false); }}
            />
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="absolute flex gap-[14px]" style={{ left: 31, top: 937, width: 577 }}>
          <button onClick={handleSave}
            className={[
              "flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold transition-all duration-150",
              canSave
                ? "bg-white text-[#2b2b2b] cursor-pointer hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
                : "bg-white text-[#2b2b2b] opacity-40 cursor-default",
            ].join(" ")}
            style={{ border: "1px solid #47d465", fontFamily: "Raleway, sans-serif" }}
            disabled={!canSave}>
            Сохранить
          </button>
          <button onClick={onCancel}
            className="flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] bg-[#f6f6f6] cursor-pointer transition-all duration-150 hover:bg-[#ebebeb] active:bg-[#e0e0e0] active:scale-[0.98]"
            style={{ border: "1px solid #47d465", fontFamily: "Raleway, sans-serif" }}>
            Отмена
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main registration screen ──────────────────────────────────────────────────

interface RegisteredClientInfo { name: string; phone: string; guests: GuestEntry[]; }

function RegistrationScreen({ phone, onCancel, onSave, onSaveAndPurchase }: {
  phone: string; onCancel: () => void; onSave: () => void; onSaveAndPurchase: (info: RegisteredClientInfo) => void;
}) {
  // Left card — user data
  const [category, setCategory]   = useState("");
  const [catOpen, setCatOpen]     = useState(false);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [inn, setInn]             = useState("");
  const [docField, setDocField]   = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender]       = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [isOrg, setIsOrg]         = useState(false);
  const [allowMail, setAllowMail] = useState(false);

  // Right card — group
  const [visitType, setVisitType]   = useState("");
  const [visitOpen, setVisitOpen]   = useState(false);
  const [guests, setGuests]         = useState<GuestEntry[]>([]);
  const [showNewGuest, setShowNewGuest]     = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<number | null>(null);

  const requiredFilled = Boolean(category && name.trim() && email.trim() && inn.trim() && docField.trim());

  const closeAll = () => { setCatOpen(false); setGenderOpen(false); setVisitOpen(false); };

  const openNewGuest = () => { setEditingGuestId(null); setShowNewGuest(true); };
  const openEditGuest = (id: number) => { setEditingGuestId(id); setShowNewGuest(true); };

  const handleGuestSave = (data: Omit<GuestEntry, "id" | "visitCount" | "selectedForVisit">) => {
    if (editingGuestId !== null) {
      setGuests(prev => prev.map(g => g.id === editingGuestId ? { ...g, ...data } : g));
    } else {
      setGuests(prev => [...prev, { id: guestIdCounter++, visitCount: 0, selectedForVisit: true, ...data }]);
    }
    setShowNewGuest(false);
  };

  return (
    <div className="absolute inset-0" style={{ backgroundColor: "#f6f6f6", zIndex: 40 }} onClick={closeAll}>
      {/* Left sidebar — matches POS design */}
      <div className="absolute bg-white overflow-hidden" style={{ left: 1, top: 0, width: 72, height: 1028 }}>
        {/* Logo */}
        <div className="absolute" style={{ top: "1.46%", left: "29.17%", right: "29.4%", bottom: "95.64%" }}>
          <svg fill="none" viewBox="0 0 29.83 29.83" style={{ width: "100%", height: "100%" }}>
            <path clipRule="evenodd" d={svgReg.p36063100} fill="#F980FF" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgReg.p1d689192} fill="#4DD0FF" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgReg.p1db0600}  fill="#F95B1C" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgReg.p30cc4f00} fill="#47D465" fillRule="evenodd" />
          </svg>
        </div>
        {/* UserPlus — active (dark bg) */}
        <div className="absolute bg-[#2b2b2b] rounded-[10px] flex items-center justify-center" style={{ left: 11, top: 91, width: 50, height: 48 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgReg.p3f80dc40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgReg.p1280af80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M20 8V14"  stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M23 11H17" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        {/* Settings */}
        <div className="absolute" style={{ left: 26, top: 855, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgReg.p3cccb600} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgReg.p3737f500} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        {/* Message */}
        <div className="absolute" style={{ left: 26, top: 908, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgReg.p1edfde00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        {/* Logout */}
        <div className="absolute" style={{ left: 26, top: 961, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgReg.p29914600} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M16 17L21 12L16 7" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M21 12H9"           stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Back arrow + title */}
      <button onClick={onCancel}
        className="absolute flex items-center justify-center cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
        style={{ left: 89, top: 22, width: 20, height: 20, background: "none", border: "none", padding: 0 }}>
        <svg fill="none" viewBox="0 0 10.14 19.99" style={{ width: 20, height: 20, transform: "rotate(180deg)" }}>
          <path d={svgReg.p19491700} fill="#303030" />
        </svg>
      </button>
      <p className="absolute font-bold text-[24px] text-[#2b2b2b] tracking-[0.3px] whitespace-nowrap"
        style={{ left: 113, top: 18, fontFamily: "Raleway, sans-serif" }}>
        Регистрация клиента
      </p>

      {/* ── LEFT CARD: Данные пользователя ── */}
      <div className="absolute bg-white rounded-[10px]" style={{ left: 99, top: 85, width: 628, height: 822 }}
        onClick={e => e.stopPropagation()}>
        {/* Card title */}
        <p className="absolute font-semibold text-[18px] text-[#252422]"
          style={{ left: 35, top: 37, fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          Данные пользователя
        </p>
        {/* Photo placeholder */}
        <div className="absolute" style={{ left: 551, top: 16 }}>
          <LandscapeIcon />
        </div>

        {/* Fields column */}
        <div className="absolute flex flex-col gap-[16px]" style={{ left: 35, top: 84, width: 557 }}>
          {/* Категория */}
          <RegDropdown label="Категория" required placeholder="Выберите категорию"
            value={category} options={CATEGORY_OPTIONS}
            open={catOpen}
            onToggle={() => { const next = !catOpen; closeAll(); setCatOpen(next); }}
            onSelect={v => { setCategory(v); setCatOpen(false); }}
          />
          {/* Обращение */}
          <RegTextField label="Обращение" required placeholder="Введите имя/фамилию гостя"
            value={name} onChange={setName} />
          {/* Телефон — pre-filled, read-only with confirm button */}
          <div className="flex flex-col gap-[6px] w-full">
            <div className="text-[14px] font-normal text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
              Номер телефона<span className="text-[#f95b1c]">*</span>
            </div>
            <div className="flex items-center gap-[10px] px-[16px] bg-[#f9f9f9] rounded-[10px]" style={{ height: 56 }}>
              <span className="flex-1 text-[16px] font-normal text-[#252422]"
                style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                {phone}
              </span>
              <div className="bg-[#47d465] rounded-[10px] px-[16px] flex items-center justify-center cursor-default transition-colors hover:bg-[#3dc05a] active:bg-[#30a84a]"
                style={{ height: 40, flexShrink: 0 }}>
                <span className="text-[16px] font-semibold text-white whitespace-nowrap"
                  style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                  Подтвердить
                </span>
              </div>
            </div>
          </div>
          {/* E-mail */}
          <RegTextField label="E-mail" required placeholder="DS@gmail.com"
            value={email} onChange={setEmail} />
        </div>

        {/* Дата рождения + Пол row */}
        <div className="absolute flex gap-[15px] items-start" style={{ left: 35, top: 471 }}>
          <RegDateField value={birthdate} onChange={setBirthdate} />
          {/* Пол */}
          <div style={{ width: 246 }}>
            <RegDropdown label="Пол" placeholder="" value={gender} options={GENDER_OPTIONS}
              open={genderOpen}
              onToggle={() => { const next = !genderOpen; closeAll(); setGenderOpen(next); }}
              onSelect={v => { setGender(v); setGenderOpen(false); }}
            />
          </div>
        </div>

        {/* ИНН */}
        <div className="absolute" style={{ left: 35, top: 564, width: 557 }}>
          <RegTextField label="ИНН" required placeholder="Введите ИНН"
            value={inn} onChange={setInn} />
        </div>

        {/* Документ */}
        <div className="absolute" style={{ left: 35, top: 660, width: 557 }}>
          <RegTextField label="Документ" required placeholder="Введите реквизиты документа"
            value={docField} onChange={setDocField} suffix={<PaperclipIcon />} />
        </div>

        {/* Checkboxes */}
        <div className="absolute" style={{ left: 37, top: 768 }}>
          <RegCheckbox checked={isOrg} onChange={setIsOrg} label="Организация" />
        </div>
        <div className="absolute" style={{ left: 217, top: 768 }}>
          <RegCheckbox checked={allowMail} onChange={setAllowMail} label="Разрешить рассылку" />
        </div>

        {/* Выдать карту */}
        <button
          className="absolute rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
          style={{ left: 426, top: 755, width: 190, height: 56, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
          Выдать карту
        </button>
      </div>

      {/* ── RIGHT CARD: Регистрация группы ── */}
      <div className="absolute bg-white rounded-[10px]" style={{ left: 753, top: 85, width: 628, height: 822 }}
        onClick={e => e.stopPropagation()}>
        {/* Регистрация группы гостей label + visit type */}
        <div className="absolute" style={{ left: 29, top: 34, width: 583 }}>
          <RegDropdown label="Регистрация группы гостей" placeholder="Укажите тип посещения"
            value={visitType} options={VISIT_OPTIONS}
            open={visitOpen}
            onToggle={() => { const next = !visitOpen; closeAll(); setVisitOpen(next); }}
            onSelect={v => { setVisitType(v); setVisitOpen(false); }}
          />
        </div>

        {/* Add guest buttons */}
        <div className="absolute flex gap-[13px]" style={{ left: 29, top: 144, width: 583 }}>
          <button onClick={openNewGuest}
            className="flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
            style={{ border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
            Добавить нового гостя
          </button>
          <button
            className="flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
            style={{ border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
            Добавить существующего гостя
          </button>
        </div>

        {/* Guest selection label */}
        <p className="absolute text-[16px] font-normal text-[#252422]"
          style={{ left: 29, top: 218, fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
          Выберите гостей для текущего посещения
        </p>

        {/* Guest list or empty state */}
        <div className="absolute overflow-y-auto flex flex-col gap-[8px]"
          style={{ left: 29, top: 250, width: 583, maxHeight: 484, scrollbarWidth: "none" }}>
          {guests.length === 0 ? (
            <p className="text-[14px] font-normal text-[#f07528] text-center mt-2"
              style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
              Нет данных
            </p>
          ) : (
            guests.map(g => (
              <GuestCard key={g.id} guest={g}
                onEdit={() => openEditGuest(g.id)}
                onToggleVisit={() => setGuests(prev => prev.map(x => x.id === g.id ? { ...x, selectedForVisit: !x.selectedForVisit } : x))}
              />
            ))
          )}
        </div>

        {/* Печать договора */}
        <button
          className="absolute rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
          style={{ left: 425, top: 755, width: 187, height: 56, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
          Печать договора
        </button>
      </div>

      {/* ── Bottom action bar ── */}
      <div className="absolute flex gap-[35px] items-center" style={{ left: 178, top: 940 }}>
        {/* Сохранить */}
        <button onClick={onSave}
          className="h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] bg-white cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
          style={{ width: 360, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif" }}>
          Сохранить
        </button>
        {/* Перейти к покупке и сохранить */}
        <button onClick={requiredFilled ? () => onSaveAndPurchase({ name, phone, guests }) : undefined}
          className={[
            "h-[56px] rounded-[10px] text-[16px] font-semibold text-white transition-all duration-150",
            requiredFilled
              ? "bg-[#47d465] cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
              : "bg-[#47d465] opacity-40 cursor-default",
          ].join(" ")}
          style={{ width: 360, border: "none", fontFamily: "Raleway, sans-serif" }}
          disabled={!requiredFilled}>
          Перейти к покупке и сохранить
        </button>
        {/* Отмена */}
        <button onClick={onCancel}
          className="h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]"
          style={{ width: 360, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
          Отмена
        </button>
      </div>

      {/* New guest overlay — rendered inside the scaled canvas, covers entire screen */}
      {showNewGuest && (
        <div className="absolute inset-0" style={{ zIndex: 60 }}>
          <NewGuestModal
            initial={editingGuestId !== null ? guests.find(g => g.id === editingGuestId) : undefined}
            onSave={handleGuestSave}
            onCancel={() => setShowNewGuest(false)}
          />
        </div>
      )}
    </div>
  );
}

// ─── Auth gate modal (mandatory-registration flow) ────────────────────────────
// Shown before adding a product when "Обязательная регистрация" is on and no
// client is authorized yet. Two tabs: phone entry (primary/first-time visit,
// leads to full registration) and card scan (secondary visit, skips straight
// to the till).

function AuthGateModal({ onClose, onPhoneSuccess, onCardSuccess }: {
  onClose: () => void;
  onPhoneSuccess: (phone: string) => void;
  onCardSuccess: () => void;
}) {
  const [tab, setTab] = useState<"phone" | "card">("phone");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [cardRead, setCardRead] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const digits = phone.replace(/\D/g, "").slice(0, 11);
  const isValid = digits.length === 11;

  useEffect(() => { if (tab === "phone" && !accepted) inputRef.current?.focus(); }, [tab, accepted]);

  const handlePhoneOk = () => {
    if (!accepted && isValid) { setAccepted(true); return; }
    if (accepted) onPhoneSuccess(digits);
  };
  const handleClear = () => { setPhone(""); setAccepted(false); };

  const handleCardClick = () => {
    if (cardRead) return;
    setCardRead(true);
    setTimeout(onCardSuccess, 400);
  };

  const switchTab = (t: "phone" | "card") => {
    setTab(t);
    setPhone(""); setAccepted(false); setCardRead(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#403e3e", opacity: 0.41 }} onClick={onClose} />
      <div className="relative bg-white rounded-[10px]" style={{ width: 596, padding: "32px 30px 30px" }}>
        <button onClick={onClose}
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
          style={{ right: 20, top: 20, background: "none", border: "none", padding: 0 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
            <path d="M6 6L18 18M18 6L6 18" stroke="#303030" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Tabs */}
        <div className="flex gap-[6px] p-[4px] rounded-[10px]" style={{ backgroundColor: "#f8f8f8" }}>
          <button onClick={() => switchTab("phone")}
            className="flex-1 h-[49px] rounded-[8px] text-[14px] font-semibold transition-all duration-150 cursor-pointer select-none"
            style={{ backgroundColor: tab === "phone" ? "#47d465" : "transparent", color: tab === "phone" ? "white" : "#252422", opacity: tab === "phone" ? 1 : 0.5 }}>
            Ввести номер
          </button>
          <button onClick={() => switchTab("card")}
            className="flex-1 h-[49px] rounded-[8px] text-[14px] font-semibold transition-all duration-150 cursor-pointer select-none"
            style={{ backgroundColor: tab === "card" ? "#47d465" : "transparent", color: tab === "card" ? "white" : "#252422", opacity: tab === "card" ? 1 : 0.5 }}>
            Считать карту
          </button>
        </div>

        {tab === "phone" ? (
          <>
            <div className="flex items-center gap-[10px] rounded-[10px] px-[16px] mt-[24px]"
              style={{ height: 60, backgroundColor: "#f8f8f8" }}>
              {accepted || isValid ? (
                <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#47D465" fillOpacity="0.12" />
                  <path d="M7 12.5L10.5 16L17 9" stroke="#47D465" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#E95525" fillOpacity="0.1" />
                  <path d="M12 7V13" stroke="#F95B1C" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.2" fill="#F95B1C" />
                </svg>
              )}
              {accepted ? (
                <span className="font-semibold text-[14px] text-[#2b2b2b] select-none" style={{ fontFeatureSettings: '"lnum","pnum"' }}>{digits}</span>
              ) : (
                <input ref={inputRef} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="flex-1 bg-transparent text-[14px] font-semibold text-[#2b2b2b] outline-none placeholder:opacity-40"
                  style={{ fontFeatureSettings: '"lnum","pnum"' }}
                  onKeyDown={(e) => { if (e.key === "Enter" && isValid) handlePhoneOk(); if (e.key === "Escape") onClose(); }} />
              )}
              {!accepted && phone.length > 0 && (
                <button onClick={handleClear} className="shrink-0 cursor-pointer transition-opacity hover:opacity-60 active:opacity-40" style={{ background: "none", border: "none", padding: 0 }}>
                  <svg fill="none" viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
                    <path d="M1 1L13 13M13 1L1 13" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex gap-[14px] mt-[24px]">
              <button onClick={handlePhoneOk} disabled={!isValid && !accepted}
                className={["flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] select-none transition-all duration-150",
                  (isValid || accepted) ? "cursor-pointer hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]" : "opacity-52 cursor-default"].join(" ")}
                style={{ border: "1px solid #47d465" }}>
                Ок
              </button>
              <button onClick={onClose}
                className="relative flex-1 h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]"
                style={{ border: "1px solid #47d465" }}>
                Отмена
                <span className="absolute top-[4px] right-[10px] text-[9px] opacity-50">Esc</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div onClick={handleCardClick}
              className="flex items-center gap-[10px] rounded-[10px] px-[16px] mt-[24px] cursor-pointer transition-shadow"
              style={{ height: 60, backgroundColor: "#f8f8f8", boxShadow: cardRead ? "0 0 0 2px rgba(71,212,101,0.35)" : undefined }}>
              {cardRead ? (
                <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#47D465" fillOpacity="0.12" />
                  <path d="M7 12.5L10.5 16L17 9" stroke="#47D465" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="#2b2b2b" strokeWidth="1.6" />
                  <path d="M3 10H21" stroke="#2b2b2b" strokeWidth="1.6" />
                </svg>
              )}
              <span className="text-[14px] font-semibold" style={{ color: cardRead ? "#2b2b2b" : "rgba(43,43,43,0.6)" }}>
                {cardRead ? "Карта считана" : "Нажмите, чтобы считать карту"}
              </span>
            </div>
            <div className="flex gap-[14px] mt-[24px]">
              <button onClick={onClose}
                className="w-full h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]"
                style={{ border: "1px solid #47d465" }}>
                Отмена
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Guest picker modal ────────────────────────────────────────────────────────
// Shown when adding a product while more than one person (primary client +
// guests checked "для текущего посещения") is on the current registration.

interface PickPerson { id: string; name: string; isPrimary: boolean; }

function GuestPickerModal({ productName, people, onPick, onCancel }: {
  productName: string; people: PickPerson[]; onPick: (p: PickPerson) => void; onCancel: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#403e3e", opacity: 0.41 }} onClick={onCancel} />
      <div className="relative bg-white rounded-[10px]" style={{ width: 480, padding: "28px 28px 24px" }}>
        <button onClick={onCancel}
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
          style={{ right: 20, top: 20, background: "none", border: "none", padding: 0 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
            <path d="M6 6L18 18M18 6L6 18" stroke="#303030" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-bold text-[18px] text-[#2b2b2b]" style={{ maxWidth: 400 }}>
          Выберите пользователя для продажи {productName}
        </p>
        <div className="flex flex-col gap-[8px] mt-[20px]">
          {people.map((p) => (
            <button key={p.id} onClick={() => onPick(p)}
              className="flex items-center gap-[8px] px-[16px] h-[52px] rounded-[10px] text-left cursor-pointer transition-colors hover:bg-[#f0f0f0] active:bg-[#e5e5e5]"
              style={{ backgroundColor: "#f9f9f9" }}>
              {p.isPrimary && (
                <svg fill="#F9C846" viewBox="0 0 20 20" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
                </svg>
              )}
              <span className="text-[14px] font-medium text-[#2b2b2b]">{p.name}</span>
            </button>
          ))}
        </div>
        <button onClick={onCancel}
          className="w-full h-[48px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98] mt-[20px]"
          style={{ border: "1px solid #47d465" }}>
          Отмена
        </button>
      </div>
    </div>
  );
}

// ─── Client registration popup (User+ button) ────────────────────────────────
// One title and one placeholder; the variant is detected from what's entered:
// 11 digits → phone, 8 hex chars → card UID, or a card read by the reader
// (button, double click or F4) fills the UID itself.

type IdentifyKind = "phone" | "uid" | "card";

function detectIdentify(raw: string): "phone" | "uid" | null {
  const v = raw.replace(/[\s()+-]/g, "");
  if (/^[78]\d{10}$/.test(v)) return "phone";
  if (/^[0-9A-F]{8}$/i.test(v)) return "uid";
  return null;
}

function ClientIdentifyModal({ dark, onClose, onPhone, onCard }: {
  dark: boolean; onClose: () => void; onPhone: (phone: string) => void; onCard: (uid: string, kind: "uid" | "card") => void;
}) {
  const c = th(dark);
  const [value, setValue] = useState("");
  const [cardRead, setCardRead] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const detected = detectIdentify(value);
  const kind: IdentifyKind | null = cardRead ? "card" : detected;
  const typing = value.trim().length > 0 && !kind;

  const readCard = () => { setValue(genCardNumber()); setCardRead(true); };
  const submit = () => {
    if (!kind) return;
    if (kind === "phone") onPhone(value.replace(/\D/g, ""));
    else onCard(value.trim().toUpperCase(), kind);
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "F4") { e.preventDefault(); readCard(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const status = kind === "phone" ? "Номер телефона"
    : kind === "uid" ? "UID карты"
    : kind === "card" ? "Карта считана"
    : typing ? "Телефон — 11 цифр, UID карты — 8 символов (0–9, A–F)"
    : "Введите номер телефона или UID карты, либо приложите карту к считывателю";
  const statusColor = kind ? "#2fae4c" : typing ? "#F95B1C" : c.textSec;

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#403e3e", opacity: 0.41 }} onClick={onClose} />
      <div role="dialog" aria-label="Регистрация клиента" className="relative rounded-[10px] transition-colors duration-300"
        style={{ width: 596, padding: "36px 30px 30px", backgroundColor: c.sidebarBg }}>
        <button onClick={onClose} aria-label="Закрыть"
          className="absolute flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]"
          style={{ right: 18, top: 18 }}>
          <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>
        <p className="font-bold text-[24px] text-center" style={{ color: c.textPrimary }}>Регистрация клиента</p>

        <div className="flex items-center gap-[10px] rounded-[10px] transition-shadow duration-150 focus-within:shadow-[inset_0_0_0_1.5px_#47d465]"
          style={{ marginTop: 26, height: 60, padding: "0 8px 0 16px", backgroundColor: c.inputBg,
            boxShadow: typing ? "inset 0 0 0 1.5px rgba(249,91,28,0.45)" : undefined }}
          onDoubleClick={readCard}>
          {kind ? (
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="12" fill="#47D465" fillOpacity="0.14" />
              <path d="M7 12.5L10.5 16L17 9" stroke="#47D465" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : typing ? (
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="12" fill="#E95525" fillOpacity="0.1" />
              <path d="M12 7V13" stroke="#F95B1C" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1.2" fill="#F95B1C" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
              <circle cx="11" cy="11" r="6.5" stroke={c.textSec} strokeWidth="1.8" /><path d="M16 16L20 20" stroke={c.textSec} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
          <input ref={inputRef} value={value} aria-label="Телефон или UID карты"
            onChange={(e) => { setValue(e.target.value); setCardRead(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="Телефон, UID карты или считайте карту"
            className="flex-1 min-w-0 bg-transparent text-[16px] font-semibold outline-none placeholder:font-normal placeholder:opacity-45"
            style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }} />
          {value && (
            <button onClick={() => { setValue(""); setCardRead(false); inputRef.current?.focus(); }} aria-label="Очистить"
              className="shrink-0 flex items-center justify-center size-[32px] rounded-[8px] cursor-pointer outline-none transition-all duration-150 hover:bg-black/5 active:bg-black/10 active:scale-90">
              <svg fill="none" viewBox="0 0 14 14" style={{ width: 13, height: 13 }}><path d="M1 1L13 13M13 1L1 13" stroke="#a0a0a0" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>
        <p className="text-[13px] leading-[1.3]" style={{ marginTop: 10, minHeight: 34, color: statusColor }}>{status}</p>

        <div className="flex gap-[14px]" style={{ marginTop: 14 }}>
          <button onClick={submit}
            className={`relative flex-1 h-[56px] rounded-[10px] text-[15px] font-semibold text-white bg-[#47d465] select-none outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#47d465] ${kind ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "opacity-45 cursor-default"}`}>
            Ок<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span>
          </button>
          <button onClick={onClose}
            className={`relative flex-1 h-[56px] rounded-[10px] text-[15px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"}`}
            style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
            Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Card Scan Modal ──────────────────────────────────────────────────────────

function CardScanModal({ onClose, onSuccess, title = "Считайте карту" }: { onClose: () => void; onSuccess: (card: string) => void; title?: string }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) onSuccess(value.trim());
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#403e3e", opacity: 0.41 }} onClick={onClose} />
      {/* Dialog: w-596 h-298, centered (matches Component2 from Figma) */}
      <div className="absolute bg-white rounded-[10px] overflow-hidden"
        style={{ width: 596, height: 298, left: "calc(50% - 7px)", top: "calc(50% - 42px)", transform: "translate(-50%,-50%)" }}>
        {/* Close button — top-right rotated cross (Group1 from import: inset-[6.71%_2.79%_81.39%_91.78%]) */}
        <button onClick={onClose}
          className="absolute flex items-center justify-center cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
          style={{ top: "6.71%", right: "2.79%", width: 32, height: 36, background: "none", border: "none", padding: 0 }}>
          <div style={{ transform: "rotate(-47.64deg) skewX(-5.27deg)" }}>
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
              <path d={svgCard.p31ed2680} fill="#303030" />
            </svg>
          </div>
        </button>
        {/* Title */}
        <p className="absolute font-bold text-[24px] text-[#2b2b2b] text-center whitespace-nowrap"
          style={{ top: 60, left: "50%", transform: "translateX(-50%)", fontFamily: "Raleway, sans-serif" }}>
          {title}
        </p>
        {/* Input field */}
        <div className="absolute flex items-center rounded-[10px] transition-shadow focus-within:ring-2 focus-within:ring-[#47d465]/30"
          style={{ left: 30, top: 112, width: 536, height: 60, backgroundColor: "#f8f8f8" }}
          onDoubleClick={() => onSuccess(value.trim() || genCardNumber())}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Двойной клик или F4 для разрешения ввода"
            className="flex-1 bg-transparent px-4 text-[16px] text-[#252422] outline-none"
            style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}
          />
        </div>
        {/* Cancel / Enter button */}
        <button onClick={onClose}
          className="absolute flex items-center justify-center rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
          style={{ left: 30, top: 198, width: 536, height: 56, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
          Отмена
          <span className="absolute top-[3px] right-[8px] text-[6px] font-semibold text-[#303030]">Esc</span>
        </button>
      </div>
    </div>
  );
}

// ─── Client Info Screen ────────────────────────────────────────────────────────

const INFO_TABS = ["Общая информация", "Билеты", "Счета", "История операций", "Прокат", "Проходы", "Связи", "Личные данные", "Опрос"];

function ClientInfoScreen({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Общая информация");
  // Form state
  const [lastName, setLastName] = useState("Маркина");
  const [firstName, setFirstName] = useState("Маша");
  const [phone, setPhone] = useState("8 912 345 67 88");
  const [email, setEmail] = useState("DS@gmail.com");
  const [birthdate, setBirthdate] = useState("12.05.2020");
  const [calOpen, setCalOpen] = useState(false);
  const [gender, setGender] = useState("Женский");
  const [genderOpen, setGenderOpen] = useState(false);
  const [childName, setChildName] = useState("Маша");
  const [comment, setComment] = useState("");
  const [onlyActiveAccts, setOnlyActiveAccts] = useState(true);
  const [onlyActiveTickets, setOnlyActiveTickets] = useState(true);

  const closeDropdowns = () => { setGenderOpen(false); setCalOpen(false); };

  // Shared sidebar SVG paths (same set as registration screen)
  const sidebarLogo = (
    <div className="absolute" style={{ inset: "1.46% 29.4% 95.64% 29.17%" }}>
      <svg fill="none" viewBox="0 0 29.83 29.83" style={{ width: "100%", height: "100%" }}>
        <path clipRule="evenodd" d={svgClientInfo.p36063100} fill="#F980FF" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgClientInfo.p1d689192} fill="#4DD0FF" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgClientInfo.p1db0600}  fill="#F95B1C" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgClientInfo.p30cc4f00} fill="#47D465" fillRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className="absolute inset-0" style={{ backgroundColor: "#f6f6f6", zIndex: 40 }} onClick={closeDropdowns}>

      {/* ── Left sidebar ── */}
      <div className="absolute bg-white overflow-hidden" style={{ left: 0, top: 0, width: 73, height: 1028 }}>
        {sidebarLogo}
        <div className="absolute bg-[#2b2b2b] rounded-[10px] flex items-center justify-center" style={{ left: 11, top: 91, width: 50, height: 48 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgClientInfo.p3f80dc40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgClientInfo.p1280af80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M20 8V14" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M23 11H17" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute" style={{ left: 26, top: 855, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgClientInfo.p3cccb600} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgClientInfo.p3737f500} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute" style={{ left: 26, top: 908, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgClientInfo.p1edfde00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute" style={{ left: 26, top: 961, width: 24, height: 24 }}>
          <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
            <path d={svgClientInfo.p29914600} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M16 17L21 12L16 7" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M21 12H9" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* ── Header: back + title ── */}
      <button onClick={onClose}
        className="absolute flex items-center gap-[16px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
        style={{ left: 80, top: 14, background: "none", border: "none", padding: 0 }}>
        <div className="flex items-center justify-center" style={{ width: 20, height: 20 }}>
          <div className="rotate-180">
            <svg fill="none" viewBox="0 0 10.14 19.99" style={{ width: 10, height: 20 }}>
              <path d={svgClientInfo.p19491700} fill="#303030" />
            </svg>
          </div>
        </div>
        <p className="font-bold text-[24px] text-[#2b2b2b] tracking-[0.3px] whitespace-nowrap"
          style={{ fontFamily: "Raleway, sans-serif" }}>
          Информация о клиенте
        </p>
      </button>

      {/* ── Tab bar ── */}
      <div className="absolute flex gap-[8px] items-center overflow-x-auto" style={{ left: 104, top: 54, right: 0, scrollbarWidth: "none" }}
        onClick={e => e.stopPropagation()}>
        {INFO_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={[
              "h-[58px] px-[16px] rounded-[10px] flex items-center justify-center whitespace-nowrap cursor-pointer text-[16px] shrink-0 transition-all duration-150",
              activeTab === tab
                ? "bg-[#47d465] text-white font-semibold hover:bg-[#3dc05a] active:bg-[#30a84a]"
                : "bg-white text-[#252422] font-normal hover:bg-[#f0fdf4] active:bg-[#dcfce7]",
            ].join(" ")}
            style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content area ── */}
      {activeTab === "Общая информация" ? (
        <>
          {/* Left: user data card */}
          <div className="absolute bg-white rounded-[10px]"
            style={{ left: 104, top: 130, width: 628, height: 880 }}>
            {/* Photo placeholder (LandscapeIcon at top-right of card) */}
            <div className="absolute overflow-hidden" style={{ left: 551, top: 16, width: 57, height: 57 }}>
              <svg fill="none" viewBox="0 0 57 57" style={{ width: 57, height: 57 }}>
                <path d={svgClientInfo.p2b2ce880} fill="#E0E4E1" />
                <path d={svgClientInfo.p2f489280} fill="#E0E4E1" />
                <path d={svgClientInfo.p37407c00} fill="#E0E4E1" />
                <path d={svgClientInfo.p14d17f00} fill="#E0E4E1" />
                <path d={svgClientInfo.p5d44b00}  fill="#E0E4E1" />
                <path d={svgClientInfo.p46d1900}  fill="#E0E4E1" />
              </svg>
            </div>

            {/* Данные пользователя section */}
            <div className="absolute" style={{ left: 35, top: 24, width: 507 }}>
              <p className="font-semibold text-[18px] text-[#252422]"
                style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                Данные пользователя
              </p>

              <div className="flex flex-col gap-[16px] mt-[24px]">
                {/* UID (read-only) */}
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
                    UID<span className="text-[#f95b1c]">*</span>
                  </p>
                  <div className="flex items-center rounded-[10px] px-[16px] py-[18px]" style={{ backgroundColor: "#f9f9f9", height: 56 }}>
                    <span className="text-[16px] text-[#252422]"
                      style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                      456DEN78
                    </span>
                  </div>
                </div>
                {/* Фамилия */}
                <CITextField label="Фамилия" required value={lastName} onChange={setLastName} />
                {/* Имя */}
                <CITextField label="Имя" required value={firstName} onChange={setFirstName} />
                {/* Phone + Email row */}
                <div className="flex gap-[16px] items-start">
                  <div className="flex flex-col gap-[6px]" style={{ width: 246 }}>
                    <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
                      Номер телефона<span className="text-[#f95b1c]">*</span>
                    </p>
                    <input
                      type="text" value={phone} onChange={e => setPhone(e.target.value)}
                      className="rounded-[10px] px-[16px] text-[16px] text-[#252422] outline-none transition-all duration-150 hover:bg-[#f0f0f0] focus:bg-[#f0f0f0] focus:ring-2 focus:ring-[#47d465]/30"
                      style={{ height: 56, backgroundColor: "#f9f9f9", border: "none", fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"', width: "100%" }}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px] flex-1">
                    <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
                      E-mail<span className="text-[#f95b1c]">*</span>
                    </p>
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="rounded-[10px] px-[16px] text-[16px] text-[#252422] outline-none transition-all duration-150 hover:bg-[#f0f0f0] focus:bg-[#f0f0f0] focus:ring-2 focus:ring-[#47d465]/30"
                      style={{ height: 56, backgroundColor: "#f9f9f9", border: "none", fontFamily: "Raleway, sans-serif", width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Данные детей section — auto-layout column matching Figma */}
            <div className="absolute flex flex-col gap-[16px]" style={{ left: 35, top: 468, width: 507 }}>
              <p className="font-semibold text-[18px] text-[#252422]"
                style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                Данные детей
              </p>
              {/* Имя */}
              <CITextField label="Имя" required value={childName} onChange={setChildName} />
              {/* Дата рождения + Пол row */}
              <div className="flex gap-[15px] items-start">
                <RegDateField value={birthdate} onChange={setBirthdate} />
                <div className="flex flex-col gap-[6px] relative" style={{ width: 246 }}>
                  <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>Пол</p>
                  <button onClick={e => { e.stopPropagation(); setGenderOpen(o => !o); }}
                    className={["flex items-center justify-between px-[16px] rounded-[10px] cursor-pointer transition-all duration-150", genderOpen ? "bg-[#f0f0f0] ring-2 ring-[#47d465]/30" : "bg-[#f9f9f9] hover:bg-[#f0f0f0] active:bg-[#e8e8e8]"].join(" ")}
                    style={{ height: 56, border: "none", width: 246 }}>
                    <span className="text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
                      {gender || "Выберите"}
                    </span>
                    <div className={genderOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                      <svg fill="none" viewBox="0 0 7.29 13.41" style={{ width: 7, height: 13 }}>
                        <path d={svgClientInfo.p3b290f00} fill="#252422" />
                      </svg>
                    </div>
                  </button>
                  {genderOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white rounded-[10px] shadow-lg overflow-hidden z-10 mt-1">
                      {GENDER_OPTIONS.map(opt => (
                        <button key={opt} onClick={e => { e.stopPropagation(); setGender(opt); setGenderOpen(false); }}
                          className={["w-full text-left px-[16px] py-[14px] text-[16px] transition-colors duration-100 cursor-pointer", gender === opt ? "bg-[#d2f4d9]" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"].join(" ")}
                          style={{ fontFamily: "Raleway, sans-serif" }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Комментарий */}
              <div className="flex flex-col gap-[6px]">
                <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Комментарий
                </p>
                <textarea
                  value={comment} onChange={e => setComment(e.target.value)}
                  className="rounded-[10px] px-[16px] py-[14px] text-[16px] text-[#252422] outline-none resize-none transition-all duration-150 hover:bg-[#f0f0f0] focus:bg-[#f0f0f0] focus:ring-2 focus:ring-[#47d465]/30 w-full"
                  style={{ height: 56, backgroundColor: "#f9f9f9", border: "none", fontFamily: "Raleway, sans-serif" }}
                />
              </div>
              {/* Buttons */}
              <div className="flex gap-[16px]">
                <button className="flex items-center justify-center gap-[10px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
                  style={{ flex: 1, height: 56, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
                  <svg fill="none" viewBox="0 0 14.5 15.5" style={{ width: 14, height: 15.5 }}>
                    <path d={svgClientInfo.p18195c80} stroke="#2B2B2B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  Прикрепить документ
                </button>
                <button className="flex items-center justify-center rounded-[10px] text-[14px] font-semibold text-white bg-[#47d465] cursor-pointer transition-all duration-150 hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
                  style={{ flex: 1, height: 56, border: "none", fontFamily: "Raleway, sans-serif" }}>
                  Сохранить
                </button>
              </div>
            </div>

          </div>

          {/* Right: scrollable info cards */}
          <div className="absolute overflow-y-auto" style={{ left: 748, top: 130, right: 24, bottom: 8, scrollbarWidth: "thin" }}>
            <div className="flex flex-col gap-[16px] pb-8" style={{ width: 643 }}>

              {/* ── Счета card ── */}
              <div className="bg-white rounded-[10px] relative" style={{ height: 189 }}>
                {/* Header */}
                <div className="absolute flex items-center justify-between" style={{ left: 12, right: 12, top: 12 }}>
                  <div className="flex items-center gap-[11px]">
                    <svg viewBox="0 0 9 9" style={{ width: 9, height: 9 }}>
                      <circle cx="4.5" cy="4.5" r="4.5" fill="#47D465" />
                    </svg>
                    <span className="font-medium text-[14px] text-[#252422]"
                      style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Счета</span>
                  </div>
                  <span className="font-normal text-[12px] text-[#252422] opacity-70"
                    style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                    Действует с 13.03.2026 до 13.04.2026
                  </span>
                </div>
                {/* Rows */}
                <div className="absolute flex flex-col gap-[13px]" style={{ left: 12, top: 40, right: 12 }}>
                  <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                    <span className="text-[12px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Депозит</span>
                    <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>1 000</span>
                  </div>
                  <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                    <span className="text-[12px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Кредит</span>
                    <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>-4 000</span>
                  </div>
                </div>
                {/* Footer */}
                <div className="absolute flex items-center justify-between" style={{ left: 13, right: 13, top: 132 }}>
                  <RegCheckbox checked={onlyActiveAccts} onChange={setOnlyActiveAccts} label="Только активные счета" />
                  <button className="flex items-center justify-center rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
                    style={{ width: 130, height: 45, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
                    Печать
                  </button>
                </div>
              </div>

              {/* ── Билеты card ── */}
              <div className="bg-white rounded-[10px] relative" style={{ minHeight: 249 }}>
                {/* Header */}
                <div className="absolute flex items-center" style={{ left: 12, top: 12 }}>
                  <div className="flex items-center gap-[11px]">
                    <svg viewBox="0 0 9 9" style={{ width: 9, height: 9 }}>
                      <circle cx="4.5" cy="4.5" r="4.5" fill="#F07528" />
                    </svg>
                    <span className="font-medium text-[14px] text-[#252422]"
                      style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Билеты</span>
                  </div>
                </div>
                {/* Ticket rows */}
                <div className="absolute flex flex-col gap-[13px]" style={{ left: 12, top: 40, right: 12 }}>
                  {/* Безлимит */}
                  <div className="flex flex-col gap-[13px] py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                    <div className="flex items-end justify-between">
                      <span className="text-[12px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Безлимит</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>1</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Действует с 13.03.2026 до 13.04.2026</span>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Активен</span>
                    </div>
                  </div>
                  {/* Детский безлимит */}
                  <div className="flex flex-col gap-[13px] py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                    <div className="flex items-end justify-between">
                      <span className="text-[12px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Детский безлимит</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>1</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Действует с 13.03.2026 до 13.04.2026</span>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Активен</span>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between px-[13px] py-[12px]" style={{ marginTop: 190 }}>
                  <RegCheckbox checked={onlyActiveTickets} onChange={setOnlyActiveTickets} label="Только активные билеты" />
                  <button className="flex items-center justify-center rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
                    style={{ width: 130, height: 45, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
                    Печать
                  </button>
                </div>
              </div>

              {/* ── Last visit + Frequent spending row ── */}
              <div className="flex gap-[16px]">
                {/* Последнее посещение */}
                <div className="bg-white rounded-[10px] relative" style={{ width: 310, height: 139 }}>
                  <div className="absolute flex items-center justify-between" style={{ left: 12, right: 12, top: 12 }}>
                    <div className="flex items-center gap-[11px]">
                      <svg viewBox="0 0 9 9" style={{ width: 9, height: 9 }}><circle cx="4.5" cy="4.5" r="4.5" fill="#4DD0FF" /></svg>
                      <span className="font-medium text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>Последнее посещение</span>
                    </div>
                    <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>23.04.2026</span>
                  </div>
                  <div className="absolute flex flex-col gap-[13px]" style={{ left: 12, top: 40, right: 12 }}>
                    <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif" }}>Аттракцион 1</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>4 000</span>
                    </div>
                    <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif" }}>Аттракцион</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>4 000</span>
                    </div>
                  </div>
                </div>
                {/* Частые траты */}
                <div className="bg-white rounded-[10px] relative flex-1" style={{ height: 139 }}>
                  <div className="absolute flex items-center gap-[11px]" style={{ left: 12, top: 12 }}>
                    <svg viewBox="0 0 9 9" style={{ width: 9, height: 9 }}><circle cx="4.5" cy="4.5" r="4.5" fill="#F980FF" /></svg>
                    <span className="font-medium text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>Частые траты</span>
                  </div>
                  <div className="absolute flex flex-col gap-[13px]" style={{ left: 12, top: 40, right: 12 }}>
                    <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif" }}>Аттракцион 1</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>40 000</span>
                    </div>
                    <div className="flex items-end justify-between py-[6px]" style={{ borderBottom: "0.4px solid rgba(43,43,43,0.12)" }}>
                      <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif" }}>Аттракцион</span>
                      <span className="font-semibold text-[16px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>20 000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Promotions + Status row ── */}
              <div className="flex gap-[16px]">
                {/* Акции / visit count */}
                <div className="bg-white rounded-[10px] px-[16px] py-[5px]" style={{ width: 309 }}>
                  <div className="flex flex-col gap-[13px] py-[6px]">
                    <div className="bg-[rgba(77,208,255,0.14)] flex items-center gap-[7px] px-[8px] py-[4px] rounded-[57px] w-fit">
                      <svg viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
                        <path d={svgClientInfo.p175a6000} fill="#4DD0FF" />
                        <path d={svgClientInfo.p11071ff0} fill="#4DD0FF" />
                        <path d={svgClientInfo.p12a6b5f0} fill="#4DD0FF" />
                      </svg>
                      <span className="font-medium text-[14px] text-[#4dd0ff]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Акции</span>
                    </div>
                    <span className="font-semibold text-[32px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>19</span>
                    <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Всего посещений</span>
                    {/* Progress bar */}
                    <div className="relative" style={{ height: 2, width: "100%" }}>
                      <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "rgba(71,212,101,0.29)" }} />
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#47D465]" style={{ width: "95%" }} />
                    </div>
                    <span className="text-[14px] text-[#303030] text-center whitespace-pre" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                      {"Ещё 1  до бесплатного "}
                    </span>
                  </div>
                </div>
                {/* Статус клиента */}
                <div className="bg-white rounded-[10px] px-[16px] py-[5px] flex-1">
                  <div className="flex flex-col gap-[13px] py-[6px]">
                    <div className="bg-[rgba(249,128,255,0.14)] flex items-center gap-[7px] px-[8px] py-[4px] rounded-[57px] w-fit">
                      <svg viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
                        <path d={svgClientInfo.p175a6000} fill="#F980FF" />
                        <path d={svgClientInfo.p11071ff0} fill="#F980FF" />
                        <path d={svgClientInfo.p12a6b5f0} fill="#F980FF" />
                      </svg>
                      <span className="font-medium text-[14px] text-[#f980ff]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Статус клиента</span>
                    </div>
                    <span className="font-semibold text-[32px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>80 000 ₽</span>
                    <span className="text-[12px] text-[#252422] opacity-70" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>Всего потрачено</span>
                    {/* Progress bar */}
                    <div className="relative" style={{ height: 2, width: "100%" }}>
                      <div className="absolute inset-0 rounded-full" style={{ backgroundColor: "rgba(71,212,101,0.29)" }} />
                      <div className="absolute top-0 left-0 h-full rounded-full bg-[#47D465]" style={{ width: "73%" }} />
                    </div>
                    <span className="text-[14px] text-[#303030] text-center whitespace-pre" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                      {"Ещё 10 000  до Платины"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Discount card ── */}
              <div className="bg-white rounded-[10px] overflow-hidden relative" style={{ height: 91 }}>
                <div className="absolute flex items-start justify-between" style={{ left: 24, top: 23, right: 24 }}>
                  <div className="flex flex-col gap-[7px]">
                    <span className="font-semibold text-[16px] text-[#2b2b2b]"
                      style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                      Многодетная - 10% на все
                    </span>
                    <div className="flex items-center gap-[12px]">
                      <div className="relative shrink-0 size-[18px] opacity-40">
                        <svg viewBox="0 0 18 18" style={{ width: 18, height: 18 }}>
                          <path d={svgClientInfo.pf392f80} fill="#303030" />
                          <path d={svgClientInfo.p24e74f00} fill="#303030" />
                          <path d={svgClientInfo.p1ddae80} fill="#303030" />
                        </svg>
                      </div>
                      <span className="text-[14px] text-[#2b2b2b]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                        Подробнее
                      </span>
                    </div>
                  </div>
                  <div className="bg-[rgba(71,212,101,0.1)] flex items-center justify-center px-[12px] py-[7px] rounded-[40px]">
                    <span className="text-[14px] text-[#17a636] leading-[20px] tracking-[-0.23px]"
                      style={{ fontFamily: "Roboto, sans-serif" }}>
                      Действует постоянно
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Birthday / greeting card ── */}
              <div className="bg-white rounded-[10px] overflow-hidden relative" style={{ minHeight: 91 }}>
                <div className="absolute flex items-start gap-[54px]" style={{ left: 24, top: 23, right: 24 }}>
                  <div className="flex flex-col gap-[7px]">
                    <span className="font-semibold text-[16px] text-[#2b2b2b]"
                      style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                      День рождения Марии
                    </span>
                    <div className="flex items-center gap-[12px]">
                      <div className="relative shrink-0 size-[18px]">
                        <svg viewBox="0 0 18 18" style={{ width: 18, height: 18 }}>
                          <path d={svgClientInfo.pf392f80} fill="#F07528" />
                          <path d={svgClientInfo.p24e74f00} fill="#F07528" />
                          <path d={svgClientInfo.p1ddae80} fill="#F07528" />
                        </svg>
                      </div>
                      <span className="text-[14px] text-[#2b2b2b]" style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
                        Осталось два дня
                      </span>
                    </div>
                  </div>
                  <button className="flex-1 flex items-center justify-center rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer transition-all duration-150 hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
                    style={{ height: 45, border: "1px solid #47d465", fontFamily: "Raleway, sans-serif", background: "white" }}>
                    Отправить поздравление
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Custom scrollbar indicator (visual, right edge of right panel) */}
          <div className="absolute w-0" style={{ left: 1418, top: 130 }}>
            <div className="absolute" style={{ inset: "-0.24% -2px", height: 844 }}>
              <svg fill="none" viewBox="0 0 4 848" style={{ width: 4, height: 848 }}>
                <path d="M2 2L2 846" stroke="#E5E5E5" strokeLinecap="round" strokeWidth="4" />
                <path d="M2 2L2 600" stroke="#47D465" strokeLinecap="round" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute flex items-center justify-center" style={{ left: 104, top: 130, right: 0, bottom: 0 }}>
          <p className="text-[18px] font-normal text-[#808080]"
            style={{ fontFamily: "Raleway, sans-serif" }}>
            Раздел «{activeTab}» в разработке
          </p>
        </div>
      )}
    </div>
  );
}

// Helper: simple editable text field for ClientInfoScreen
function CITextField({ label, required, value, onChange }: {
  label: string; required?: boolean; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="text-[14px] text-[#252422]" style={{ fontFamily: "Raleway, sans-serif" }}>
        {label}{required && <span className="text-[#f95b1c]">*</span>}
      </p>
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)}
        className="rounded-[10px] px-[16px] text-[16px] text-[#252422] outline-none transition-all duration-150 hover:bg-[#f0f0f0] focus:bg-[#f0f0f0] focus:ring-2 focus:ring-[#47d465]/30"
        style={{ height: 56, backgroundColor: "#f9f9f9", border: "none", fontFamily: "Raleway, sans-serif", width: "100%" }}
      />
    </div>
  );
}

// ─── POS Screen ───────────────────────────────────────────────────────────────

// ─── Admin mode screen ────────────────────────────────────────────────────────
// Opened by the shield icon while "Режим администратора" is on. Always dark.

const AD_PANEL = "#2c2c2b";
const AD_FIELD = "#3a3a39";
const AD_LINE = "#4d4d4b";
const AD_MUTED = "#9b9b99";
const AD_BTN = "select-none cursor-pointer outline-none transition-[background-color,box-shadow,transform] duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465]";
const AD_ROW = "select-none cursor-pointer outline-none transition-colors duration-150 focus-visible:bg-[#363635]";
const AD_OUTLINE = `${AD_BTN} rounded-[10px] text-white bg-[#2e2e2d] shadow-[inset_0_0_0_1px_#47d465] hover:bg-[#3a3a39] active:bg-[#252524]`;
const AD_NEUTRAL = `${AD_BTN} rounded-[10px] text-white bg-[#2e2e2d] hover:bg-[#3a3a39] active:bg-[#252524]`;
const adGreen = (on: boolean) =>
  `${AD_BTN} rounded-[10px] text-white font-semibold bg-[#47d465] ${on ? "hover:bg-[#3dc05a] active:bg-[#30a84a]" : "opacity-45 pointer-events-none"}`;
const AD_SCROLL = "overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-[#4d4d4b] [&::-webkit-scrollbar-thumb]:bg-[#47d465] [&::-webkit-scrollbar-thumb]:rounded-full";

const adPad = (n: number) => String(n).padStart(2, "0");
const adFmtShort = (d: Date) => `${adPad(d.getDate())}.${adPad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
const adFmtFull = (d: Date) => `${adPad(d.getDate())}.${adPad(d.getMonth() + 1)}.${d.getFullYear()}`;
const adHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join("").toUpperCase();

const AD_TABS = [
  { id: "goods",    label: "Оформление товаров" },
  { id: "cards",    label: "Регистрация карт в системе" },
  { id: "discount", label: "Запись скидки" },
  { id: "delDisc",  label: "Удаление скидки" },
  { id: "pledge",   label: "Освободить ячейку залога" },
  { id: "returns",  label: "Возврат товаров" },
  { id: "staff",    label: "Карты сотрудников" },
  { id: "reports",  label: "Отчеты" },
];

function AdQrIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#8d8d8b" aria-hidden>
      <path fillRule="evenodd" d="M2 2h8v8H2V2Zm2 2v4h4V4H4ZM14 2h8v8h-8V2Zm2 2v4h4V4h-4ZM2 14h8v8H2v-8Zm2 2v4h4v-4H4Z" />
      <path d="M14 14h3v3h-3zM19 14h3v3h-3zM14 19h3v3h-3zM19 19h3v3h-3z" />
    </svg>
  );
}

function AdChevron({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path d={up ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Dark "Считайте карту" popup over a blurred backdrop. Clicking the field simulates a
// scan; typing a number and pressing Enter confirms manual entry.
function AdminCardPopup({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);
  return (
    <div className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 60, backgroundColor: "rgba(20,20,20,0.55)", backdropFilter: "blur(10px)" }} onClick={onCancel}>
      <div className="relative rounded-[10px]" style={{ width: 520, padding: "36px 26px 26px", backgroundColor: AD_PANEL }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onCancel} aria-label="Закрыть"
          className="absolute flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer outline-none transition-all duration-150 hover:bg-white/10 active:bg-white/15 active:scale-90"
          style={{ right: 14, top: 14 }}>
          <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
        <p className="text-center font-bold text-[22px] text-white">Считайте карту</p>
        <input autoFocus value={value} onChange={(e) => setValue(e.target.value)}
          placeholder="Двойной клик или F4 для разрешения ввода"
          onClick={() => { if (!value) onSuccess(); }}
          onKeyDown={(e) => { if (e.key === "Enter" && value.trim()) onSuccess(); }}
          className="mt-[26px] w-full h-[48px] rounded-[10px] px-[16px] text-[14px] text-white outline-none cursor-pointer placeholder:text-[#8a8a88] focus:ring-2 focus:ring-[#47d465]/40"
          style={{ backgroundColor: AD_FIELD }} />
        <button onClick={onCancel} className={`${AD_OUTLINE} relative mt-[22px] w-full h-[50px] text-[14px] font-semibold`}>
          Отмена
          <span className="absolute text-[8px] opacity-60" style={{ top: 4, right: 8 }}>Esc</span>
        </button>
      </div>
    </div>
  );
}

function AdFooter({ onClientInfo, onDelete, canDelete, onWrite, canWrite, done }: {
  onClientInfo: () => void; onDelete: () => void; canDelete: boolean; onWrite: () => void; canWrite: boolean; done: boolean;
}) {
  return (
    <div className="flex items-center justify-between shrink-0" style={{ marginTop: 22, height: 56 }}>
      <button onClick={onClientInfo} className={`${AD_OUTLINE} h-[56px] px-[26px] text-[15px] font-medium`}>Информация о клиенте</button>
      {done && <span className="text-[14px] font-medium text-[#47d465]">Операция завершена</span>}
      <div className="flex" style={{ gap: 12 }}>
        <button onClick={onDelete} className={`${AD_NEUTRAL} h-[56px] text-[15px] font-medium ${canDelete ? "" : "opacity-60 pointer-events-none"}`} style={{ width: 180 }}>Удалить</button>
        <button onClick={onWrite} className={`${adGreen(canWrite)} h-[56px] text-[15px]`} style={{ width: 206 }}>Записать</button>
      </div>
    </div>
  );
}

function useAdDone() {
  const [done, setDone] = useState(false);
  useEffect(() => { if (!done) return; const t = setTimeout(() => setDone(false), 2500); return () => clearTimeout(t); }, [done]);
  return [done, setDone] as const;
}

// ── Tab 1: Оформление товаров ──
const AD_GOODS_GROUPS = [
  { id: "tickets", title: "Билеты", items: ["Безлимит", "Входной билет 1 час"] },
  { id: "cards",   title: "Карты",  items: ["Карта", "Браслет"] },
];
const AD_GOODS_COLS = "36px 1.5fr 0.8fr 1.2fr 0.6fr";

function AdminGoodsTab({ onClientInfo }: { onClientInfo: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ tickets: true, cards: true });
  const [pending, setPending] = useState<string | null>(null);
  const [rows, setRows] = useState<{ id: number; name: string; qty: number }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useAdDone();
  const nextId = useRef(1);

  const addRow = (name: string) =>
    setRows((prev) => prev.some((r) => r.name === name)
      ? prev.map((r) => (r.name === name ? { ...r, qty: r.qty + 1 } : r))
      : [...prev, { id: nextId.current++, name, qty: 1 }]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 min-h-0" style={{ gap: 16 }}>
        <section className="flex-1 min-w-0 flex flex-col rounded-[10px]" style={{ backgroundColor: AD_PANEL }}>
          <p className="shrink-0 text-[13px] text-[#cfcfcd]" style={{ padding: "18px 14px 12px" }}>Записать на карту товары:</p>
          <div className={`flex-1 min-h-0 ${AD_SCROLL}`}>
            {AD_GOODS_GROUPS.map((g) => (
              <div key={g.id}>
                <button onClick={() => setOpen((o) => ({ ...o, [g.id]: !o[g.id] }))}
                  className={`${AD_ROW} w-full h-[40px] flex items-center gap-[8px] px-[14px] text-[14px] ${open[g.id]
                    ? "bg-[#d9f6e0] text-[#2b2b2b] hover:bg-[#c9efd3] active:bg-[#bde8c9]"
                    : "bg-[#353534] text-white hover:bg-[#3e3e3d] active:bg-[#2a2a29]"}`}>
                  <AdChevron up={!!open[g.id]} />{g.title}
                </button>
                {open[g.id] && g.items.map((name) => (
                  <button key={name} onClick={() => setPending(name)}
                    className={`${AD_ROW} w-full h-[40px] text-left px-[14px] text-[14px] text-white hover:bg-[#363635] active:bg-[#2a2a29]`}
                    style={{ borderBottom: `1px solid ${AD_LINE}` }}>{name}</button>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1 min-w-0 flex flex-col rounded-[10px]" style={{ backgroundColor: AD_PANEL }}>
          <div className="shrink-0 grid items-center text-[13px] text-[#cfcfcd]" style={{ gridTemplateColumns: AD_GOODS_COLS, padding: "18px 14px 12px" }}>
            <span /><span>Название</span><span>Карта</span><span>Категория клиента</span><span className="text-right">Кол-во</span>
          </div>
          <div className={`flex-1 min-h-0 ${AD_SCROLL}`}>
            {rows.map((r) => {
              const sel = selected === r.id;
              return (
                <button key={r.id} onClick={() => setSelected(sel ? null : r.id)}
                  className={`${AD_ROW} w-full grid items-center h-[42px] text-left text-[13px] ${sel ? "bg-[#d9f6e0] text-[#2b2b2b]" : "text-white hover:bg-[#363635] active:bg-[#2a2a29]"}`}
                  style={{ gridTemplateColumns: AD_GOODS_COLS, padding: "0 14px" }}>
                  <AdQrIcon /><span>{r.name}</span><span>Печать</span><span /><span className="text-right">{r.qty}</span>
                </button>
              );
            })}
          </div>
          <div className="shrink-0" style={{ borderTop: `1px solid ${AD_LINE}` }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ввести почту"
              className="w-full h-[52px] px-[14px] bg-transparent text-[13px] text-white outline-none placeholder:text-[#8a8a88] focus:bg-white/5" />
          </div>
        </section>
      </div>
      <AdFooter onClientInfo={onClientInfo} done={done}
        canDelete={selected !== null} onDelete={() => { setRows((p) => p.filter((r) => r.id !== selected)); setSelected(null); }}
        canWrite={rows.length > 0} onWrite={() => { setRows([]); setSelected(null); setEmail(""); setDone(true); }} />
      {pending && <AdminCardPopup onCancel={() => setPending(null)} onSuccess={() => { addRow(pending); setPending(null); }} />}
    </div>
  );
}

// ── Tab 2: Регистрация карт в системе ──
const AD_REG_MODES = ["Ручной ввод бортового номера", "Бортовой номер + UID карты", "Счетчик", "Без бортовых номеров"];

function AdminCardRegTab() {
  const [mode, setMode] = useState(0);
  const [count, setCount] = useState(0);
  const [last, setLast] = useState<{ uid: string; num: string } | null>(null);
  const [popup, setPopup] = useState(false);

  const registerCard = () => {
    setCount((c) => c + 1);
    setLast({ uid: adHex(8), num: mode === 3 ? "—" : String(1000 + count + 1) });
    setPopup(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 min-h-0" style={{ gap: 18 }}>
        <div className="flex items-center justify-between rounded-[10px] shrink-0" style={{ backgroundColor: AD_PANEL, height: 72, padding: "0 28px" }}>
          {AD_REG_MODES.map((label, i) => (
            <button key={label} onClick={() => setMode(i)} role="radio" aria-checked={mode === i}
              className="flex items-center gap-[10px] text-[13px] text-white cursor-pointer select-none outline-none group focus-visible:ring-2 focus-visible:ring-[#47d465] rounded-[6px] p-[4px]">
              <span className="flex items-center justify-center size-[22px] rounded-full transition-colors duration-150 group-hover:bg-[#47d465]/15 group-active:bg-[#47d465]/25"
                style={{ boxShadow: "inset 0 0 0 1.5px #47d465" }}>
                {mode === i && <span className="size-[12px] rounded-full bg-[#47d465]" />}
              </span>
              {label}
            </button>
          ))}
        </div>
        <div className="flex justify-end shrink-0">
          <button onClick={() => setPopup(true)} className={`${AD_OUTLINE} h-[54px] px-[22px] text-[15px] font-medium`}>Добавить бортовой номер на существующую карту</button>
        </div>
        <div className="flex items-center justify-center rounded-[10px] shrink-0 text-[15px] font-semibold text-white"
          style={{ backgroundColor: AD_PANEL, height: 60 }}>
          {count === 0 ? "Выберите режим записи бортовых номеров" : `Режим: ${AD_REG_MODES[mode]}. Считайте следующую карту`}
        </div>
        <div className="flex shrink-0" style={{ gap: 16 }}>
          <div className="flex-1 flex items-center gap-[14px] rounded-[10px] text-[16px] font-medium text-white" style={{ backgroundColor: AD_PANEL, height: 76, padding: "0 20px" }}>
            <span className="flex items-center justify-center size-[34px] rounded-[8px]" style={{ backgroundColor: AD_FIELD }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#47d465" strokeWidth="1.6" /><path d="M3 10H21" stroke="#47d465" strokeWidth="1.6" /></svg>
            </span>
            Карт обработано: <b>{count}</b>
          </div>
          <div className="flex-1 flex items-center gap-[14px] rounded-[10px] text-[16px] font-medium text-white" style={{ backgroundColor: AD_PANEL, height: 76, padding: "0 20px" }}>
            <span className="flex items-center justify-center size-[34px] rounded-[8px]" style={{ backgroundColor: AD_FIELD }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="#47d465" strokeWidth="1.6" /><path d="M8 12l3 3 5-6" stroke="#47d465" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span>Последняя карта:</span>
            <span className="ml-[40px] text-[14px] leading-[1.9]">
              <span className="block"><b>UID:</b> {last?.uid ?? ""}</span>
              <span className="block"><b>Бортовой номер:</b> {last?.num ?? ""}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end shrink-0" style={{ marginTop: 22 }}>
        <button onClick={() => setPopup(true)} className={`${adGreen(true)} h-[56px] text-[15px]`} style={{ width: 206 }}>Начать</button>
      </div>
      {popup && <AdminCardPopup onCancel={() => setPopup(false)} onSuccess={registerCard} />}
    </div>
  );
}

// ── Tab 3: Запись скидки ──
const AD_DISCOUNTS = [{ name: "Многодетная", size: 20 }, { name: "Льготная", size: 10 }, { name: "Группа", size: 5 }];
const AD_DISC_COLS = "1.3fr 0.9fr 0.9fr 1fr 1fr";

function AdminDiscountTab({ onClientInfo }: { onClientInfo: () => void }) {
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [rows, setRows] = useState<{ id: number; name: string; from: string; to: string }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useAdDone();
  const nextId = useRef(1);

  const addDiscount = (idx: number) => {
    const from = new Date(); const to = new Date(); to.setFullYear(to.getFullYear() + 1);
    setRows((p) => p.some((r) => r.name === AD_DISCOUNTS[idx].name) ? p : [...p, { id: nextId.current++, name: AD_DISCOUNTS[idx].name, from: adFmtFull(from), to: adFmtFull(to) }]);
  };

  return (
    <div className="flex flex-col h-full">
      <p className="shrink-0 text-[14px] font-semibold text-white" style={{ marginBottom: 12 }}>Запись скидки</p>
      <div className="flex flex-1 min-h-0" style={{ gap: 16 }}>
        <section className="flex-1 min-w-0 flex flex-col rounded-[10px]" style={{ backgroundColor: AD_PANEL }}>
          <div className="shrink-0 grid text-[13px] text-[#cfcfcd]" style={{ gridTemplateColumns: "1fr 120px", padding: "18px 14px 12px" }}>
            <span>Название</span><span>Размер</span>
          </div>
          <div className={`flex-1 min-h-0 ${AD_SCROLL}`}>
            {AD_DISCOUNTS.map((d, i) => (
              <button key={d.name} onClick={() => { setPickedIdx(i); setPending(i); }}
                className={`${AD_ROW} w-full grid items-center h-[40px] text-left text-[13px] ${pickedIdx === i ? "bg-[#d9f6e0] text-[#2b2b2b]" : "text-white hover:bg-[#363635] active:bg-[#2a2a29]"}`}
                style={{ gridTemplateColumns: "1fr 120px", padding: "0 14px", borderBottom: pickedIdx === i ? "none" : `1px solid ${AD_LINE}` }}>
                <span>{d.name}</span><span>{d.size}</span>
              </button>
            ))}
          </div>
        </section>
        <section className="flex-1 min-w-0 flex flex-col rounded-[10px]" style={{ backgroundColor: AD_PANEL }}>
          <div className="shrink-0 grid text-[13px] text-[#cfcfcd]" style={{ gridTemplateColumns: AD_DISC_COLS, padding: "18px 14px 12px" }}>
            <span>Название</span><span>С</span><span>До</span><span>Активна с</span><span>Активна до</span>
          </div>
          <div className={`flex-1 min-h-0 ${AD_SCROLL}`}>
            {rows.map((r) => {
              const sel = selected === r.id;
              return (
                <button key={r.id} onClick={() => setSelected(sel ? null : r.id)}
                  className={`${AD_ROW} w-full grid items-center h-[40px] text-left text-[12px] ${sel ? "bg-[#d9f6e0] text-[#2b2b2b]" : "text-white hover:bg-[#363635] active:bg-[#2a2a29]"}`}
                  style={{ gridTemplateColumns: AD_DISC_COLS, padding: "0 14px" }}>
                  <span className="truncate">{r.name}</span><span className="truncate">{r.from}</span><span className="truncate">{r.to}</span><span />
                  <span className="flex justify-end">
                    {sel && <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M13.5 3.5L16.5 6.5L7 16L3.5 16.5L4 13L13.5 3.5Z" stroke="#2b2b2b" strokeWidth="1.4" strokeLinejoin="round" /></svg>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
      <AdFooter onClientInfo={onClientInfo} done={done}
        canDelete={selected !== null} onDelete={() => { setRows((p) => p.filter((r) => r.id !== selected)); setSelected(null); }}
        canWrite={rows.length > 0} onWrite={() => { setRows([]); setSelected(null); setPickedIdx(null); setDone(true); }} />
      {pending !== null && <AdminCardPopup onCancel={() => setPending(null)} onSuccess={() => { addDiscount(pending); setPending(null); }} />}
    </div>
  );
}

// ── Tabs 4 & 6: Удаление скидки / Возврат товаров (load data from a card) ──
function AdminLoadTab({ kind }: { kind: "goods" | "discount" }) {
  const [popup, setPopup] = useState(false);
  const [rows, setRows] = useState<{ name: string; qty: number; amount: number; checked: boolean }[]>([]);
  const [done, setDone] = useAdDone();
  const isGoods = kind === "goods";
  const cols = "1.4fr 1fr 1fr";

  const load = () => {
    setRows(isGoods
      ? [{ name: "Входной билет 1 час", qty: 3, amount: 0, checked: false }, { name: "Безлимит", qty: 1, amount: 0, checked: false }]
      : [{ name: "Многодетная", qty: 20, amount: 0, checked: false }, { name: "Льготная", qty: 10, amount: 0, checked: false }]);
    setPopup(false);
  };
  const canApply = rows.some((r) => (isGoods ? r.amount > 0 : r.checked));

  return (
    <div className="flex flex-col h-full">
      <p className="shrink-0 text-[14px] font-semibold text-white" style={{ marginBottom: 16 }}>{isGoods ? "Удаление товаров карты:" : "Удаление скидок карты:"}</p>
      <div className="shrink-0">
        <button onClick={() => setPopup(true)} className={`${AD_OUTLINE} h-[48px] text-[15px] font-medium`} style={{ width: 290 }}>Загрузить данные с карты</button>
      </div>
      <section className="flex-1 min-h-0 flex flex-col rounded-[10px]" style={{ backgroundColor: AD_PANEL, marginTop: 18 }}>
        <div className="shrink-0 grid text-[13px] text-[#cfcfcd]" style={{ gridTemplateColumns: cols, padding: "18px 22px 12px", borderBottom: "1px solid #bdbdbb" }}>
          <span>Название</span><span>{isGoods ? "Количество" : "Размер"}</span><span>{isGoods ? "Сколько удалить" : "Удалить"}</span>
        </div>
        <div className={`flex-1 min-h-0 ${AD_SCROLL}`}>
          {rows.map((r, i) => (
            <div key={r.name} className="grid items-center h-[52px] text-[14px] text-white" style={{ gridTemplateColumns: cols, padding: "0 22px", borderBottom: `1px solid ${AD_LINE}` }}>
              <span>{r.name}</span><span>{r.qty}</span>
              {isGoods ? (
                <input type="number" min={0} max={r.qty} value={r.amount}
                  onChange={(e) => { const v = Math.max(0, Math.min(r.qty, parseInt(e.target.value || "0", 10) || 0)); setRows((p) => p.map((x, j) => (j === i ? { ...x, amount: v } : x))); }}
                  className="w-[90px] h-[34px] rounded-[8px] px-[10px] text-[14px] text-white outline-none focus:ring-2 focus:ring-[#47d465]/50" style={{ backgroundColor: AD_FIELD }} />
              ) : (
                <button role="checkbox" aria-checked={r.checked} onClick={() => setRows((p) => p.map((x, j) => (j === i ? { ...x, checked: !x.checked } : x)))}
                  className="flex items-center justify-center size-[22px] rounded-[5px] cursor-pointer outline-none transition-colors duration-150 hover:bg-[#47d465]/20 active:bg-[#47d465]/35 focus-visible:ring-2 focus-visible:ring-[#47d465]"
                  style={{ boxShadow: "inset 0 0 0 1.5px #47d465", backgroundColor: r.checked ? "#47d465" : undefined }}>
                  {r.checked && <svg viewBox="0 0 20 20" className="size-full" fill="none"><path d="M4 9.5L8.5 14L16 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
      {rows.length > 0 && (
        <div className="flex items-center justify-end shrink-0" style={{ marginTop: 22, gap: 18 }}>
          {done && <span className="text-[14px] font-medium text-[#47d465]">Операция завершена</span>}
          <button onClick={() => { setRows([]); setDone(true); }} className={`${adGreen(canApply)} h-[56px] text-[15px]`} style={{ width: 206 }}>Применить</button>
        </div>
      )}
      {rows.length === 0 && done && <p className="text-[14px] font-medium text-[#47d465] shrink-0" style={{ marginTop: 18 }}>Операция завершена</p>}
      {popup && <AdminCardPopup onCancel={() => setPopup(false)} onSuccess={load} />}
    </div>
  );
}

// ── Tab 5: Освободить ячейку залога ──
function AdminPledgeTab() {
  const [cell, setCell] = useState("");
  const [done, setDone] = useAdDone();
  return (
    <div className="flex flex-col h-full">
      <p className="shrink-0 text-[14px] font-semibold text-white" style={{ marginBottom: 16 }}>Освободить ячейку залога</p>
      <div className="flex items-center shrink-0" style={{ gap: 14 }}>
        <input value={cell} onChange={(e) => setCell(e.target.value.replace(/\D/g, ""))} placeholder="Номер ячейки"
          className="h-[48px] rounded-[10px] px-[16px] text-[14px] text-white outline-none placeholder:text-[#8a8a88] focus:ring-2 focus:ring-[#47d465]/40" style={{ width: 340, backgroundColor: AD_PANEL }} />
        <button onClick={() => { setCell(""); setDone(true); }} className={`${AD_OUTLINE} h-[48px] px-[26px] text-[15px] font-medium ${cell ? "" : "opacity-50 pointer-events-none"}`}>Освободить</button>
        {done && <span className="text-[14px] font-medium text-[#47d465]">Ячейка освобождена</span>}
      </div>
    </div>
  );
}

// ── Tab 7: Карты сотрудников ──
const AD_ROLES = ["Не зарегистрирован", "Кассир", "Старший кассир", "Администратор"];

function AdminStaffTab() {
  const [email, setEmail] = useState("");
  const [found, setFound] = useState(false);
  const [error, setError] = useState(false);
  const [role, setRole] = useState(AD_ROLES[0]);
  const [parkReg, setParkReg] = useState(false);
  const [card, setCard] = useState<{ uid: string; num: string } | null>(null);
  const [popup, setPopup] = useState(false);
  const [done, setDone] = useAdDone();

  const search = () => { if (/\S+@\S+/.test(email)) { setFound(true); setError(false); } else { setError(true); setFound(false); } };
  const reset = () => { setFound(false); setEmail(""); setRole(AD_ROLES[0]); setParkReg(false); setCard(null); setDone(true); };
  const field = (label: string, value: string) => (
    <div className="flex flex-col" style={{ gap: 6 }}>
      <span className="text-[12px] text-[#cfcfcd]">{label}</span>
      <div className="flex items-center h-[50px] rounded-[10px] px-[16px] text-[15px] text-white" style={{ backgroundColor: AD_FIELD }}>{value}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <p className="shrink-0 text-[14px] font-semibold text-white" style={{ marginBottom: 14 }}>Учетная запись сотрудника</p>
      <div className="flex items-center shrink-0" style={{ gap: 14 }}>
        <input value={email} onChange={(e) => { setEmail(e.target.value); setFound(false); }} onKeyDown={(e) => { if (e.key === "Enter") search(); }}
          placeholder="Ввести e-mail"
          className="flex-1 h-[48px] rounded-[10px] px-[18px] text-[14px] text-white outline-none placeholder:text-[#8a8a88] focus:ring-2 focus:ring-[#47d465]/40" style={{ backgroundColor: AD_PANEL }} />
        <button onClick={search} className={`${AD_OUTLINE} h-[48px] px-[26px] text-[15px] font-medium`}>Создать или найти учетную запись</button>
      </div>
      {!found ? (
        <div className="flex items-center justify-center rounded-[10px] shrink-0 text-[14px] font-semibold text-[#f95b1c]" style={{ backgroundColor: AD_PANEL, height: 60, marginTop: 18 }}>
          {error ? "Введите корректный e-mail" : "Создайте или выберите существующую учетную запись"}
        </div>
      ) : (
        <>
          <section className={`flex-1 min-h-0 rounded-[10px] ${AD_SCROLL}`} style={{ backgroundColor: AD_PANEL, marginTop: 18, padding: "26px 30px" }}>
            <p className="text-[17px] font-bold text-white" style={{ marginBottom: 18 }}>Данные пользователя</p>
            <div className="grid" style={{ gap: 14, gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ gridColumn: "1 / 3" }}>{field("Фамилия Имя Отчество", "Данилов Андрей Викторович")}</div>
              <div style={{ gridColumn: "1 / 3" }}>{field("User ID", "700771")}</div>
              {field("Регистрация в системе с:", "03.10.2018")}
              {field("Регистрация в парке:", parkReg ? "Да" : "Нет")}
              <div className="flex flex-col" style={{ gap: 6 }}>
                <span className="text-[12px] text-[#cfcfcd]">Роль</span>
                <div className="relative">
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full h-[50px] rounded-[10px] px-[16px] text-[15px] text-white outline-none appearance-none cursor-pointer transition-colors duration-150 hover:bg-[#444443] focus:ring-2 focus:ring-[#47d465]/50" style={{ backgroundColor: AD_FIELD }}>
                    {AD_ROLES.map((r) => <option key={r} value={r} style={{ backgroundColor: "#2c2c2b" }}>{r}</option>)}
                  </select>
                  <span className="absolute pointer-events-none text-white" style={{ right: 14, top: 16 }}><AdChevron up={false} /></span>
                </div>
              </div>
              {field("E-mail", email)}
              {field("Бортовой номер", card?.num ?? "Нет")}
              {field("UID карты", card?.uid ?? "Нет")}
            </div>
            {!card && <p className="text-[14px] font-semibold text-[#f95b1c]" style={{ marginTop: 18 }}>Карта не выдана или неактивна</p>}
          </section>
          <div className="flex items-center shrink-0" style={{ marginTop: 22, gap: 16 }}>
            <button onClick={() => setParkReg(true)} className={`${AD_OUTLINE} h-[56px] flex-1 text-[15px] font-medium ${parkReg ? "opacity-50 pointer-events-none" : ""}`}>Зарегистрировать в парке</button>
            <button onClick={() => setPopup(true)} className={`${AD_OUTLINE} h-[56px] flex-1 text-[15px] font-medium`}>Выдать карту сотрудника</button>
            <button onClick={reset} className={`${adGreen(true)} h-[56px] flex-1 text-[15px]`}>Сохранить</button>
          </div>
        </>
      )}
      {done && !found && <p className="text-[14px] font-medium text-[#47d465] shrink-0" style={{ marginTop: 14 }}>Данные сохранены</p>}
      {popup && <AdminCardPopup onCancel={() => setPopup(false)} onSuccess={() => { setCard({ uid: adHex(8), num: String(2000 + Math.floor(Math.random() * 900)) }); setPopup(false); }} />}
    </div>
  );
}

// ── Tab 8: Отчеты (+ calendar / time picker) ──
interface AdDT { date: Date; hour: number; minute: number; }

function AdminDateTimeField({ value, onChange }: { value: AdDT; onChange: (v: AdDT) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<AdDT>(value);
  const [view, setView] = useState({ y: value.date.getFullYear(), m: value.date.getMonth() });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const end = new Date(value.date); end.setDate(end.getDate() + 1);
  const openPicker = () => { setDraft(value); setView({ y: value.date.getFullYear(), m: value.date.getMonth() }); setOpen(true); };
  const shiftMonth = (d: number) => setView((v) => { const n = new Date(v.y, v.m + d, 1); return { y: n.getFullYear(), m: n.getMonth() }; });
  const off = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => new Date(view.y, view.m, 1 - off + i));
  const today = new Date();
  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const clockPos = (n: number, r: number) => { const a = ((n % 12) * 30 * Math.PI) / 180; return { x: 108 + r * Math.sin(a), y: 108 - r * Math.cos(a) }; };
  const sel = clockPos(draft.hour, 82);
  const navBtn = "flex items-center justify-center size-[28px] rounded-[6px] cursor-pointer outline-none text-white transition-all duration-150 hover:bg-white/10 active:bg-white/15 active:scale-90";
  const selectCls = "h-[28px] rounded-[4px] bg-transparent px-[6px] text-[13px] text-white outline-none cursor-pointer transition-colors duration-150 hover:bg-white/10 focus:ring-2 focus:ring-[#47d465]/50";

  return (
    <div ref={ref} className="relative">
      <button onClick={() => (open ? setOpen(false) : openPicker())}
        className="w-full flex items-center justify-between rounded-[10px] cursor-pointer select-none outline-none text-white text-[14px] leading-[1.25] transition-[background-color,transform] duration-150 hover:bg-white/5 active:bg-white/10 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#47d465]"
        style={{ boxShadow: "inset 0 0 0 1px #ffffff", padding: "9px 14px", textAlign: "center" }}>
        <span className="flex-1">
          {adFmtShort(value.date)}-{adFmtShort(end)}<br />
          {adPad(value.hour)}:{adPad(value.minute)}-{adPad((value.hour + 1) % 24)}:{adPad(value.minute)}
        </span>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2.5" stroke="#47d465" strokeWidth="1.6" /><path d="M3 10H21M8 3v4M16 3v4" stroke="#47d465" strokeWidth="1.6" strokeLinecap="round" /><path d="M7 14h2M11 14h2M15 14h2M7 17.5h2M11 17.5h2" stroke="#47d465" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 flex rounded-[10px]"
          style={{ top: "calc(100% + 8px)", zIndex: 50, width: 560, padding: 16, gap: 18, backgroundColor: "#2a2a29", boxShadow: "0 10px 40px rgba(0,0,0,0.55)", textAlign: "left" }}>
          <div style={{ width: 290 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <button onClick={() => shiftMonth(-1)} className={navBtn} aria-label="Предыдущий месяц"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
              <span className="text-[13px] text-white">{MONTHS_RU[view.m]} {view.y}</span>
              <button onClick={() => shiftMonth(1)} className={navBtn} aria-label="Следующий месяц"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
            </div>
            <div className="grid text-center text-[12px] rounded-[4px]" style={{ gridTemplateColumns: "repeat(7, 1fr)", backgroundColor: AD_FIELD, color: AD_MUTED, height: 30, alignItems: "center" }}>
              {DAYS_SHORT.map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", marginTop: 6 }}>
              {cells.map((d) => {
                const isSel = same(d, draft.date);
                const inMonth = d.getMonth() === view.m;
                return (
                  <button key={d.toISOString()} onClick={() => setDraft((p) => ({ ...p, date: d }))}
                    className={`relative h-[38px] text-[13px] cursor-pointer outline-none transition-colors duration-150 rounded-[6px] ${isSel ? "bg-[#47d465] text-white font-semibold" : `hover:bg-white/10 active:bg-white/20 ${inMonth ? "text-white" : "text-[#6f6f6d]"}`}`}>
                    {d.getDate()}
                    {same(d, today) && !isSel && <span className="absolute rounded-full bg-[#47d465]" style={{ width: 4, height: 4, left: "50%", bottom: 4, transform: "translateX(-50%)" }} />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center" style={{ width: 216 }}>
            <svg viewBox="0 0 216 216" width="216" height="216" aria-label="Выбор часа">
              <circle cx="108" cy="108" r="106" fill="#333332" />
              <line x1="108" y1="108" x2={sel.x} y2={sel.y} stroke="#47d465" strokeWidth="1.5" />
              <circle cx="108" cy="108" r="3.5" fill="#47d465" />
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
                const p = clockPos(n, 82);
                const on = draft.hour % 12 === n % 12;
                return (
                  <g key={n} className="cursor-pointer" onClick={() => setDraft((d) => ({ ...d, hour: (n % 12) + (d.hour >= 12 ? 12 : 0) }))}>
                    <circle cx={p.x} cy={p.y} r="17" fill={on ? "#47d465" : "transparent"} className={on ? "" : "hover:fill-white/10"} />
                    <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize="13" fill={on ? "#ffffff" : "#bdbdbb"} style={{ pointerEvents: "none" }}>{n}</text>
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center self-start" style={{ gap: 6, marginTop: 6 }}>
              <select value={draft.hour} onChange={(e) => setDraft((d) => ({ ...d, hour: Number(e.target.value) }))} className={selectCls} style={{ boxShadow: "inset 0 0 0 1px #ffffff99" }}>
                {Array.from({ length: 24 }, (_, h) => <option key={h} value={h} style={{ backgroundColor: "#2c2c2b" }}>{adPad(h)}</option>)}
              </select>
              <span className="text-white">:</span>
              <select value={draft.minute} onChange={(e) => setDraft((d) => ({ ...d, minute: Number(e.target.value) }))} className={selectCls} style={{ boxShadow: "inset 0 0 0 1px #ffffff99" }}>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => <option key={m} value={m} style={{ backgroundColor: "#2c2c2b" }}>{adPad(m)}</option>)}
              </select>
            </div>
            <div className="flex items-center self-stretch justify-between" style={{ marginTop: 12 }}>
              <button onClick={() => setDraft((d) => ({ ...d, date: new Date(), hour: new Date().getHours() }))}
                className="text-[13px] text-[#cfcfcd] underline underline-offset-2 cursor-pointer outline-none transition-colors duration-150 hover:text-white active:text-[#47d465]">Сегодня</button>
              <div className="flex" style={{ gap: 8 }}>
                <button onClick={() => setOpen(false)} className="h-[30px] px-[14px] rounded-[4px] bg-white text-[13px] text-[#2b2b2b] cursor-pointer outline-none transition-all duration-150 hover:bg-[#ececec] active:bg-[#dcdcdc] active:scale-95">Отмена</button>
                <button onClick={() => { onChange(draft); setOpen(false); }} className="h-[30px] px-[14px] rounded-[4px] bg-[#47d465] text-[13px] font-semibold text-white cursor-pointer outline-none transition-all duration-150 hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-95">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminReportsTab({ onReport, canOpenShift }: { onReport: (label: string) => void; canOpenShift: boolean }) {
  const initial = (): AdDT => ({ date: new Date(), hour: 13, minute: 0 });
  const [saleRange, setSaleRange] = useState<AdDT>(initial);
  const [reportRange, setReportRange] = useState<AdDT>(initial);
  const rBtn = (label: string, dim = false) => (
    <button key={label} onClick={() => !dim && onReport(label)}
      className={`${AD_OUTLINE} w-full h-[54px] px-[12px] text-[15px] font-medium ${dim ? "text-[#9b9b99] pointer-events-none" : ""}`}>{label}</button>
  );
  const col = (title: string, body: React.ReactNode) => (
    <section className="flex-1 min-w-0 rounded-[10px]" style={{ backgroundColor: AD_PANEL, padding: "18px 16px 20px" }}>
      <p className="text-[15px] text-white" style={{ paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid #6b6b69" }}>{title}</p>
      <div className="flex flex-col" style={{ gap: 12 }}>{body}</div>
    </section>
  );
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-stretch shrink-0" style={{ gap: 16 }}>
        {col("Старший кассир", <>{["Z отчет", "X отчет"].map((l) => rBtn(l))}{rBtn("Открыть смену", !canOpenShift)}{["Сверка итогов", "Журнал эквайринга"].map((l) => rBtn(l))}</>)}
        {col("Наличные", <>{["Внесение наличных", "Инкассация"].map((l) => rBtn(l))}</>)}
        {col("Чек реализации услуг", <><AdminDateTimeField value={saleRange} onChange={setSaleRange} />{rBtn("Печать")}</>)}
        {col("Отчеты", <><AdminDateTimeField value={reportRange} onChange={setReportRange} />{["Итоговый отчет по продажам", "Сводный отчет по оплатам", "Детальный по прокату (выдача)", "Итоговый по прокату (выдача)"].map((l) => rBtn(l))}</>)}
      </div>
    </div>
  );
}

function AdminScreen({ onClose, onClientInfo, onReport, canOpenShift }: { onClose: () => void; onClientInfo: () => void; onReport: (label: string) => void; canOpenShift: boolean }) {
  const [tab, setTab] = useState("goods");
  const tabBody: Record<string, React.ReactNode> = {
    goods: <AdminGoodsTab onClientInfo={onClientInfo} />,
    cards: <AdminCardRegTab />,
    discount: <AdminDiscountTab onClientInfo={onClientInfo} />,
    delDisc: <AdminLoadTab kind="discount" />,
    pledge: <AdminPledgeTab />,
    returns: <AdminLoadTab kind="goods" />,
    staff: <AdminStaffTab />,
    reports: <AdminReportsTab onReport={onReport} canOpenShift={canOpenShift} />,
  };
  return (
    <div className="absolute inset-0 flex flex-col" style={{ zIndex: 38, backgroundColor: "#1f1e1d", padding: "18px 59px 24px 99px" }}>
      <div className="flex items-center shrink-0" style={{ gap: 8, height: 44 }}>
        <button onClick={onClose} aria-label="Назад"
          className="flex items-center justify-center size-[32px] rounded-[8px] cursor-pointer outline-none text-white transition-all duration-150 hover:bg-white/10 active:bg-white/15 active:scale-90 focus-visible:ring-2 focus-visible:ring-[#47d465]">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <p className="font-bold text-[24px] text-white tracking-[0.3px]">Режим администратора</p>
      </div>
      <div className="flex shrink-0" style={{ gap: 8, marginTop: 14 }}>
        {AD_TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} aria-pressed={tab === t.id}
            className={`${AD_BTN} h-[38px] px-[12px] rounded-[10px] text-[14px] whitespace-nowrap ${tab === t.id
              ? "bg-[#47d465] text-white font-semibold hover:bg-[#3dc05a] active:bg-[#30a84a]"
              : "bg-[#2e2e2d] text-[#e6e6e4] hover:bg-[#3a3a39] active:bg-[#252524]"}`}>{t.label}</button>
        ))}
      </div>
      <div className="flex-1 min-h-0" style={{ marginTop: 20 }}>
        {AD_TABS.map((t) => (
          <div key={t.id} className="h-full" style={{ display: tab === t.id ? "block" : "none" }}>{tabBody[t.id]}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Debts / returns helpers ─────────────────────────────────────────────────
// Prototype data: a card number ending in "0" has no debts and nothing to return,
// any other number gets generated sample data (so both outcomes can be demoed).

type MenuAction = "debts" | "returnCard" | "returnCheck" | "returnCarrier" | "pledgeTake" | "pledgeReturn" | "pledgeCells" | "clientSearch" | "cardHistory" | "preorders" | "cardExtra" | "cardExtraSearch" | "service" | "cardBlock" | "cardUnblock" | "mergeAccounts" | "extendTicket";

const cardHasData = (card: string) => !card.trim().endsWith("0");
const genCardNumber = () => Math.random().toString(16).slice(2, 9).toUpperCase().padEnd(7, "A") + String(1 + Math.floor(Math.random() * 9));

const DEBT_SAMPLES = [
  { name: "Долг: просрочка проката", price: 150 },
  { name: "Долг: штраф за утерю браслета", price: 300 },
  { name: "Долг: доплата за время", price: 200 },
];
const debtsForCard = (card: string) =>
  cardHasData(card) ? DEBT_SAMPLES.slice(0, 1 + (card.trim().charCodeAt(card.trim().length - 1) % 3)) : [];

interface ReturnRow {
  id: number; name: string; card: string; sold: Date; validTo: Date | null;
  qty: number; rest: number; price: number; cashbox: string; check: string;
  payments: { method: string; sum: number }[]; manager?: boolean;
}
const rowSum = (r: ReturnRow) => r.payments.reduce((s, p) => s + p.sum, 0);

function buildReturnRows(mode: "card" | "check", card: string): ReturnRow[] {
  const now = new Date();
  const at = (h: number, m: number) => { const d = new Date(now); d.setHours(h, m, 0, 0); return d; };
  const valid = new Date(now); valid.setFullYear(valid.getFullYear() + 1);
  if (mode === "card") {
    return [
      { id: 1, name: "Депозит", card, sold: at(10, 12), validTo: null, qty: 1, rest: 1400, price: 1400, cashbox: "Касса 1", check: "10231", payments: [{ method: "Наличные", sum: 1400 }] },
      { id: 2, name: "Безлимит", card, sold: at(11, 40), validTo: valid, qty: 1, rest: 1, price: 800, cashbox: "Касса 1", check: "10234", payments: [{ method: "Безналичные", sum: 500 }, { method: "Бонусы", sum: 300 }] },
      { id: 3, name: "Входной билет 1 час", card, sold: at(12, 5), validTo: valid, qty: 2, rest: 2, price: 250, cashbox: "Касса 2", check: "10240", payments: [{ method: "Наличные", sum: 500 }], manager: true },
    ];
  }
  return [
    { id: 1, name: "Входной билет 1 час", card: "4AB6EC76", sold: at(10, 12), validTo: valid, qty: 2, rest: 2, price: 250, cashbox: "Касса 1", check: "10231", payments: [{ method: "Наличные", sum: 500 }] },
    { id: 2, name: "Безлимит", card: "7C21D9A0", sold: at(10, 12), validTo: valid, qty: 1, rest: 1, price: 800, cashbox: "Касса 1", check: "10231", payments: [{ method: "Безналичные", sum: 800 }] },
    { id: 3, name: "Депозит", card: "9F3B11E4", sold: at(13, 27), validTo: null, qty: 1, rest: 1400, price: 1400, cashbox: "Касса 2", check: "10244", payments: [{ method: "Наличные", sum: 1000 }, { method: "Безналичные", sum: 400 }] },
    { id: 4, name: "Карта", card: "5D0E77B2", sold: at(14, 3), validTo: null, qty: 1, rest: 1, price: 150, cashbox: "Касса 2", check: "10247", payments: [{ method: "Наличные", sum: 150 }] },
    { id: 5, name: "Браслет", card: "2E8A40C1", sold: at(15, 30), validTo: valid, qty: 1, rest: 1, price: 350, cashbox: "Касса 1", check: "10250", payments: [{ method: "Безналичные", sum: 350 }], manager: true },
  ];
}

const toLocalInput = (d: Date) => `${d.getFullYear()}-${adPad(d.getMonth() + 1)}-${adPad(d.getDate())}T${adPad(d.getHours())}:${adPad(d.getMinutes())}`;
const fmtRowDate = (d: Date | null) => (d ? `${adPad(d.getDate())}.${adPad(d.getMonth() + 1)}.${d.getFullYear()} ${adPad(d.getHours())}:${adPad(d.getMinutes())}` : "");

function RetCheckbox({ checked, onChange, label, dark }: { checked: boolean; onChange: () => void; label?: string; dark: boolean }) {
  const c = th(dark);
  return (
    <button role="checkbox" aria-checked={checked} aria-label={label ?? "Выбрать позицию"} onClick={onChange}
      className="group flex items-center gap-[10px] cursor-pointer select-none outline-none rounded-[6px] focus-visible:ring-2 focus-visible:ring-[#47d465]"
      style={{ color: c.textPrimary }}>
      <span className="flex items-center justify-center size-[22px] rounded-[5px] shrink-0 transition-colors duration-150 group-hover:bg-[#47d465]/20 group-active:bg-[#47d465]/35"
        style={{ boxShadow: "inset 0 0 0 1.5px #47d465", backgroundColor: checked ? "#47d465" : undefined }}>
        {checked && <svg viewBox="0 0 20 20" className="size-full" fill="none"><path d="M4 9.5L8.5 14L16 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>}
      </span>
      {label && <span className="text-[15px]">{label}</span>}
    </button>
  );
}

const RET_COLS = "44px 1.5fr 1fr 1.35fr 1.35fr 0.8fr 0.8fr 0.8fr 0.9fr 0.9fr";
const RET_SCROLL = "overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#47d465] [&::-webkit-scrollbar-thumb]:rounded-full";

function ReturnWindow({ mode, card, dark, onClose, onDone }: {
  mode: "card" | "check"; card?: string; dark: boolean; onClose: () => void; onDone: (summary: { count: number; sum: number }) => void;
}) {
  const c = th(dark);
  const allRows = useRef(buildReturnRows(mode, card ?? "")).current;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const [from, setFrom] = useState(toLocalInput(today));
  const [to, setTo] = useState(toLocalInput(tomorrow));
  const [cashbox, setCashbox] = useState("all");
  const [checkNo, setCheckNo] = useState("");
  const [manager, setManager] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const fromTs = new Date(from).getTime();
  const toTs = new Date(to).getTime();
  const rows = allRows.filter((r) =>
    (mode === "card" || cashbox === "all" || r.cashbox === cashbox) &&
    (isNaN(fromTs) || r.sold.getTime() >= fromTs) && (isNaN(toTs) || r.sold.getTime() < toTs) &&
    (!checkNo.trim() || r.check.includes(checkNo.trim())) && (manager || !r.manager));
  const selectedRows = rows.filter((r) => checked.has(r.id));
  const allChecked = rows.length > 0 && selectedRows.length === rows.length;
  const total = selectedRows.reduce((s, r) => s + rowSum(r), 0);
  const active = rows.find((r) => r.id === activeId) ?? null;

  const toggle = (id: number) => setChecked((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleAll = () => setChecked(allChecked ? new Set() : new Set(rows.map((r) => r.id)));

  const mint = dark ? "#1f4a2a" : "#dffbe6";
  const fieldCls = "h-[48px] rounded-[10px] px-[14px] text-[15px] outline-none cursor-pointer transition-[background-color,box-shadow] duration-150 focus:shadow-[inset_0_0_0_1.5px_#47d465] " + (dark ? "hover:bg-[#444443]" : "hover:bg-[#efefef]");
  const fieldStyle: React.CSSProperties = { backgroundColor: c.inputBg, color: c.textPrimary, colorScheme: dark ? "dark" : "light" };
  const label = (t: string) => <span className="text-[15px]" style={{ color: c.textSec }}>{t}</span>;

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onClose} />
      <div className="relative flex flex-col rounded-[10px] transition-colors duration-300"
        style={{ width: 1180, height: 800, padding: "30px 32px 28px", backgroundColor: c.sidebarBg }}>
        <button onClick={onClose} aria-label="Закрыть"
          className="absolute flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]"
          style={{ right: 22, top: 22 }}>
          <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>

        <div className="shrink-0">
          <p className="font-bold text-[24px]" style={{ color: c.textPrimary }}>{mode === "card" ? "Возврат по карте" : "Возврат по чеку"}</p>
          {mode === "card" && <p className="text-[14px]" style={{ color: c.textSec, marginTop: 4 }}>Карта {card}</p>}
        </div>

        <div className="flex items-center shrink-0" style={{ gap: 14, marginTop: 22 }}>
          {mode === "check" && (
            <>
              {label("Касса")}
              <div className="relative" style={{ width: 170 }}>
                <select value={cashbox} onChange={(e) => setCashbox(e.target.value)} aria-label="Касса" className={`${fieldCls} w-full appearance-none pr-[38px]`} style={fieldStyle}>
                  <option value="all">Все кассы</option><option value="Касса 1">Касса 1</option><option value="Касса 2">Касса 2</option>
                </select>
                <span className="absolute pointer-events-none" style={{ right: 12, top: 15, color: c.textPrimary }}><AdChevron up={false} /></span>
              </div>
            </>
          )}
          {label("Дата продажи")}{label("С")}
          <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Дата продажи с" className={fieldCls} style={{ ...fieldStyle, width: 214 }} />
          {label("До")}
          <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Дата продажи до" className={fieldCls} style={{ ...fieldStyle, width: 214 }} />
          {mode === "check" && (
            <>
              {label("Номер чека")}
              <input value={checkNo} onChange={(e) => setCheckNo(e.target.value.replace(/\D/g, ""))} aria-label="Номер чека" className={`${fieldCls} cursor-text`} style={{ ...fieldStyle, width: 110 }} />
            </>
          )}
        </div>

        <div className="flex items-center justify-between shrink-0" style={{ marginTop: 18 }}>
          <RetCheckbox checked={allChecked} onChange={toggleAll} label="Выделить всё" dark={dark} />
          <RetCheckbox checked={manager} onChange={() => setManager((m) => !m)} label="Операции управляющего" dark={dark} />
        </div>

        <div className="flex flex-1 min-h-0" style={{ gap: 14, marginTop: 14 }}>
          <div className="flex-1 min-w-0 flex flex-col rounded-[10px] overflow-hidden" style={{ boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
            <div className="grid items-center shrink-0 text-[13px] font-semibold" style={{ gridTemplateColumns: RET_COLS, height: 42, backgroundColor: c.inputBg, color: c.textSec }}>
              <span />{["Название", "Карта", "Дата продажи", "Действ. до", "Кол-во", "Остаток", "Цена", "Имя кассы", "Номер чека"].map((h) => <span key={h} className="truncate pr-[6px]">{h}</span>)}
            </div>
            <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
              {rows.length === 0 && (
                <p className="text-center text-[14px]" style={{ color: c.textSec, padding: "40px 20px" }}>Нет позиций, доступных к возврату</p>
              )}
              {rows.map((r) => {
                const isActive = r.id === activeId;
                return (
                  <div key={r.id} onClick={() => setActiveId(r.id)}
                    className={`grid items-center cursor-pointer select-none transition-colors duration-150 text-[13px] ${isActive ? "" : dark ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-black/[0.035] active:bg-black/[0.07]"}`}
                    style={{ gridTemplateColumns: RET_COLS, height: 50, color: c.textPrimary, backgroundColor: isActive ? mint : undefined, borderTop: `1px solid ${c.divider}`, fontFeatureSettings: '"lnum","pnum"' }}>
                    <span className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                      <RetCheckbox checked={checked.has(r.id)} onChange={() => toggle(r.id)} dark={dark} />
                    </span>
                    <span className="truncate pr-[6px] font-semibold">{r.name}{r.manager && <span className="ml-[6px] text-[10px] font-normal opacity-60">упр.</span>}</span>
                    <span className="truncate pr-[6px]">{r.card}</span>
                    <span className="truncate pr-[6px]">{fmtRowDate(r.sold)}</span>
                    <span className="truncate pr-[6px]">{fmtRowDate(r.validTo)}</span>
                    <span>{r.qty}</span><span>{r.rest}</span><span>{r.price}</span>
                    <span className="truncate pr-[6px]">{r.cashbox}</span><span>{r.check}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col rounded-[10px] overflow-hidden shrink-0" style={{ width: 250, boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
            <div className="grid items-center shrink-0 text-[13px] font-semibold" style={{ gridTemplateColumns: "1.3fr 0.8fr", height: 42, backgroundColor: c.inputBg, color: c.textSec, padding: "0 12px" }}>
              <span>Процессинг</span><span className="text-right">Сумма</span>
            </div>
            <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
              {active?.payments.map((p) => (
                <div key={p.method} className="grid items-center text-[13px]" style={{ gridTemplateColumns: "1.3fr 0.8fr", height: 50, padding: "0 12px", color: c.textPrimary, borderTop: `1px solid ${c.divider}`, backgroundColor: mint }}>
                  <span>{p.method}</span><span className="text-right font-semibold">{p.sum}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between shrink-0" style={{ marginTop: 20 }}>
          <p className="text-[15px]" style={{ color: c.textSec }}>
            Выбрано позиций: <b style={{ color: c.textPrimary }}>{selectedRows.length}</b> · К возврату: <b style={{ color: c.textPrimary }}>{total} ₽</b>
          </p>
          <div className="flex" style={{ gap: 12 }}>
            <button onClick={() => selectedRows.length > 0 && onDone({ count: selectedRows.length, sum: total })}
              className={`h-[56px] rounded-[10px] text-[15px] font-semibold text-white bg-[#47d465] select-none outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#47d465] ${selectedRows.length > 0 ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "opacity-45 cursor-default"}`}
              style={{ width: 200 }}>
              Возврат
            </button>
            <button onClick={onClose}
              className={`relative h-[56px] rounded-[10px] text-[15px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"}`}
              style={{ width: 200, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
              Отмена
              <span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Result / error dialog. With `copyValue` it shows the card number with a copy button.
function NoticeModal({ dark, title, text, copyValue, onClose }: { dark: boolean; title: string; text: string; copyValue?: string; onClose: () => void }) {
  const c = th(dark);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffect(() => { if (!copied) return; const t = setTimeout(() => setCopied(false), 1500); return () => clearTimeout(t); }, [copied]);
  const copy = () => {
    try { void navigator.clipboard?.writeText(copyValue ?? ""); } catch { /* clipboard unavailable — still show feedback */ }
    setCopied(true);
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 70 }}>
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onClose} />
      <div role="alertdialog" aria-label={title} className="relative rounded-[10px] transition-colors duration-300" style={{ width: 596, padding: "40px 40px 40px", backgroundColor: c.sidebarBg }}>
        <button onClick={onClose} aria-label="Закрыть"
          className="absolute flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]"
          style={{ right: 20, top: 20 }}>
          <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>
        <p className="font-bold text-[24px] text-center" style={{ color: c.textPrimary }}>{title}</p>
        <p className="text-[16px] text-center leading-[1.4]" style={{ color: c.textSec, marginTop: 16 }}>{text}</p>
        {copyValue && (
          <div className="flex items-center rounded-[10px]" style={{ marginTop: 24, height: 56, padding: "0 8px 0 16px", backgroundColor: c.inputBg }}>
            <span className="flex-1 text-[16px] font-semibold select-text" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>{copyValue}</span>
            <button onClick={copy}
              className={`h-[40px] px-[14px] rounded-[8px] text-[14px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}
              style={{ color: copied ? "#47d465" : c.textPrimary }}>
              {copied ? "Скопировано" : "Копировать номер карты"}
            </button>
          </div>
        )}
        <button onClick={onClose} autoFocus
          className={`w-full h-[56px] rounded-[10px] text-[16px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"}`}
          style={{ marginTop: 24, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

// ─── Pledge / client search / card history windows ───────────────────────────

type PledgeType = "Документы" | "Деньги" | "Водительское удостоверение";
const PLEDGE_TYPES: PledgeType[] = ["Документы", "Деньги", "Водительское удостоверение"];
interface Pledge { cell: number; type: PledgeType; card: string; comment: string; place: string; takenAt: Date; returnedAt: Date | null; }

function seedPledges(): Pledge[] {
  const d1 = new Date(); d1.setDate(d1.getDate() - 5); d1.setHours(14, 33, 0, 0);
  const d2 = new Date(); d2.setHours(Math.max(0, d2.getHours() - 1), 1, 0, 0);
  return [
    { cell: 1, type: "Деньги", card: "73512AA4", comment: "", place: "Гардероб", takenAt: d1, returnedAt: null },
    { cell: 2, type: "Документы", card: "03F300A4", comment: "", place: "Сейф", takenAt: d2, returnedAt: null },
  ];
}
const firstFreeCell = (list: Pledge[]) => { let n = 1; while (list.some((p) => !p.returnedAt && p.cell === n)) n++; return n; };

// Shared look for the light/dark modal buttons used across these windows.
const winOutline = (dark: boolean) =>
  `relative h-[56px] rounded-[10px] text-[15px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"}`;
const winGreen = (on: boolean) =>
  `relative h-[56px] rounded-[10px] text-[15px] font-semibold text-white bg-[#47d465] select-none outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#47d465] ${on ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "opacity-45 cursor-default"}`;
const winField = (dark: boolean) =>
  "h-[48px] rounded-[10px] px-[14px] text-[15px] outline-none transition-[background-color,box-shadow] duration-150 focus:shadow-[inset_0_0_0_1.5px_#47d465] " + (dark ? "hover:bg-[#444443]" : "hover:bg-[#efefef]");

function useEscape(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handler(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function WinFrame({ dark, title, subtitle, width, height, onClose, children, z = 60 }: {
  dark: boolean; title: string; subtitle?: string; width: number; height?: number; onClose: () => void; children: React.ReactNode; z?: number;
}) {
  const c = th(dark);
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: z }}>
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onClose} />
      <div role="dialog" aria-label={title} className="relative flex flex-col rounded-[10px] transition-colors duration-300"
        style={{ width, height, padding: "30px 32px 28px", backgroundColor: c.sidebarBg }}>
        <button onClick={onClose} aria-label="Закрыть"
          className="absolute flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]"
          style={{ right: 22, top: 22 }}>
          <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>
        <p className="font-bold text-[24px] shrink-0" style={{ color: c.textPrimary, paddingRight: 40 }}>{title}</p>
        {subtitle && <p className="text-[14px] shrink-0" style={{ color: c.textSec, marginTop: 4 }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function WinTable({ dark, cols, headers, rows, activeKey, onRowClick, empty }: {
  dark: boolean; cols: string; headers: string[]; rows: { key: string; cells: React.ReactNode[] }[];
  activeKey?: string | null; onRowClick?: (key: string) => void; empty: string;
}) {
  const c = th(dark);
  const mint = dark ? "#1f4a2a" : "#dffbe6";
  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-[10px] overflow-hidden" style={{ boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
      <div className="grid items-center shrink-0 text-[13px] font-semibold" style={{ gridTemplateColumns: cols, height: 42, padding: "0 14px", backgroundColor: c.inputBg, color: c.textSec }}>
        {headers.map((h) => <span key={h} className="truncate pr-[8px]">{h}</span>)}
      </div>
      <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
        {rows.length === 0 && <p className="text-center text-[14px]" style={{ color: c.textSec, padding: "40px 20px" }}>{empty}</p>}
        {rows.map((r) => {
          const active = r.key === activeKey;
          return (
            <div key={r.key} onClick={() => onRowClick?.(r.key)}
              className={`grid items-center text-[14px] select-none transition-colors duration-150 ${onRowClick ? "cursor-pointer" : ""} ${active ? "" : dark ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-black/[0.035] active:bg-black/[0.07]"}`}
              style={{ gridTemplateColumns: cols, height: 50, padding: "0 14px", color: c.textPrimary, backgroundColor: active ? mint : undefined, borderTop: `1px solid ${c.divider}`, fontFeatureSettings: '"lnum","pnum"' }}>
              {r.cells.map((cell, i) => <span key={i} className="truncate pr-[8px]">{cell}</span>)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PledgeTypeModal({ dark, card, onPick, onCancel }: { dark: boolean; card: string; onPick: (t: PledgeType) => void; onCancel: () => void }) {
  const c = th(dark);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      const i = ["1", "2", "3"].indexOf(e.key);
      if (i >= 0) onPick(PLEDGE_TYPES[i]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPick, onCancel]);
  return (
    <WinFrame dark={dark} title="Выберите тип залога" subtitle={`Карта ${card}`} width={596} onClose={onCancel}>
      <div className="flex flex-col" style={{ gap: 12, marginTop: 24 }}>
        {PLEDGE_TYPES.map((t, i) => (
          <button key={t} onClick={() => onPick(t)}
            className={`relative h-[72px] rounded-[10px] text-[18px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-[#444443] active:bg-[#4d4d4b]" : "hover:bg-[#ececec] active:bg-[#e0e0e0]"}`}
            style={{ backgroundColor: c.inputBg, color: c.textPrimary }}>
            {t}
            <span className="absolute text-[11px] opacity-55" style={{ top: 8, right: 14, color: c.textSec }}>{i + 1} (Num{i + 1})</span>
          </button>
        ))}
        <button onClick={onCancel} className={`${winOutline(dark)} mt-[10px]`} style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена
          <span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

function ChoiceModal({ dark, title, subtitle, options, onPick, onCancel }: {
  dark: boolean; title: string; subtitle?: string; options: string[]; onPick: (o: string) => void; onCancel: () => void;
}) {
  const c = th(dark);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      const i = Number(e.key) - 1;
      if (Number.isInteger(i) && i >= 0 && i < options.length) onPick(options[i]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [options, onPick, onCancel]);
  return (
    <WinFrame dark={dark} title={title} subtitle={subtitle} width={596} onClose={onCancel}>
      <div className="flex flex-col" style={{ gap: 12, marginTop: 24 }}>
        {options.map((o, i) => (
          <button key={o} onClick={() => onPick(o)}
            className={`relative h-[72px] rounded-[10px] text-[18px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-[#444443] active:bg-[#4d4d4b]" : "hover:bg-[#ececec] active:bg-[#e0e0e0]"}`}
            style={{ backgroundColor: c.inputBg, color: c.textPrimary }}>
            {o}
            <span className="absolute text-[11px] opacity-55" style={{ top: 8, right: 14, color: c.textSec }}>{i + 1} (Num{i + 1})</span>
          </button>
        ))}
        <button onClick={onCancel} className={`${winOutline(dark)} mt-[10px]`} style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена
          <span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

// Services this till provides, with the price charged per pass.
const TILL_SERVICES: { name: string; price: number }[] = [
  { name: "Общая зона", price: 250 },
  { name: "Расписание для мероприятий", price: 400 },
];

// Second-level "Действия с кассой" flyout opened from the sidebar gear icon.
const TILL_ACTIONS: { label: string; disabled?: string; title: string; text: string }[] = [
  { label: "Сверка итогов", title: "Сверка итогов выполнена", text: "Итоги по банковскому терминалу сверены, расхождений нет." },
  { label: "Печать слипов", disabled: "Нет слипов для печати", title: "", text: "" },
  { label: "Открыть смену", disabled: "Смена уже открыта", title: "Смена открыта", text: "Новая смена открыта, можно продавать." },
  { label: "Сменить режим", title: "Режим кассы изменён", text: "Касса переключена в другой режим работы." },
  { label: "Задать бобину", title: "Бобина задана", text: "Новая бобина чековой ленты зарегистрирована." },
  { label: "Вычесть", title: "Операция выполнена", text: "Операция «Вычесть» проведена по кассе." },
];

function TillActionsFlyout({ dark, adminMode, canOpenShift, onClose, onAction }: { dark: boolean; adminMode: boolean; canOpenShift: boolean; onClose: () => void; onAction: (a: (typeof TILL_ACTIONS)[number]) => void }) {
  const c = th(dark);
  useEscape(onClose);
  const gearTop = adminMode ? 862 : 838;
  // Same look as the side menu's second-level panel (SidebarMenu submenu).
  const cardCls = dark
    ? "bg-[#303030] hover:bg-[#3a3a3a] active:bg-[#444444] active:shadow-[inset_0_0_0_1.5px_#ffffff]"
    : "bg-[#f5f5f5] hover:bg-[#ebebeb] active:bg-[#e2e2e2] active:shadow-[inset_0_0_0_1.5px_#2b2b2b]";
  return (
    <>
      <div className="absolute inset-0" style={{ zIndex: 39, backgroundColor: "rgba(50,50,50,0.38)" }} onClick={onClose} />
      <div role="menu" aria-label="Действия с кассой" className="absolute flex flex-col rounded-r-[12px] transition-colors duration-300"
        style={{ zIndex: 40, left: 73, bottom: Math.max(16, 1024 - gearTop - 24 - 60), width: 366, maxHeight: 1024, backgroundColor: c.sidebarBg, boxShadow: "0 0 28px rgba(0,0,0,0.14)", animation: "tillFlyoutIn 160ms ease-out" }}>
        <style>{"@keyframes tillFlyoutIn{from{transform:translateX(-8px);opacity:0}to{transform:none;opacity:1}}"}</style>
        <div className="flex items-center justify-between shrink-0" style={{ padding: "26px 16px 14px 20px" }}>
          <p className="font-bold text-[22px]" style={{ color: c.textPrimary }}>Действия с кассой</p>
          <button onClick={onClose} aria-label="Закрыть"
            className="flex items-center justify-center size-[36px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]">
            <svg viewBox="0 0 24 24" className="size-[20px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="flex flex-col gap-[10px] overflow-y-auto" style={{ padding: "0 16px 20px" }}>
          {TILL_ACTIONS.map((t) => (t.label === "Открыть смену" && canOpenShift ? { ...t, disabled: undefined } : t)).map((a) => (
            <button key={a.label} role="menuitem" disabled={!!a.disabled} onClick={() => onAction(a)}
              className={`group relative text-left select-none outline-none rounded-[12px] transition-[background-color,box-shadow] duration-150 focus-visible:shadow-[inset_0_0_0_2px_#47d465] flex items-center justify-between ${a.disabled ? `${dark ? "bg-[#303030]" : "bg-[#f5f5f5]"} opacity-45 cursor-not-allowed` : `${cardCls} cursor-pointer`}`}
              style={{ height: 72, padding: "0 18px", color: c.textPrimary }}>
              <span className="text-[18px] font-medium leading-[1.2]">{a.label}</span>
              {a.disabled && <span className="shrink-0 ml-[12px] text-[12px]" style={{ color: c.textSec }}>{a.disabled}</span>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function PledgeCommentModal({ dark, type, onOk, onCancel }: { dark: boolean; type: PledgeType; onOk: (comment: string) => void; onCancel: () => void }) {
  const c = th(dark);
  const [text, setText] = useState("");
  useEscape(onCancel);
  return (
    <WinFrame dark={dark} title="Комментарий к залогу" subtitle={`Тип залога: ${type}`} width={596} onClose={onCancel}>
      <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} maxLength={200}
        placeholder="Необязательно"
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onOk(text.trim()); } }}
        className={`${winField(dark)} resize-none py-[12px] h-[120px]`} style={{ marginTop: 22, backgroundColor: c.inputBg, color: c.textPrimary }} />
      <div className="flex" style={{ gap: 14, marginTop: 22 }}>
        <button onClick={() => onOk(text.trim())} className={`${winGreen(true)} flex-1`}>
          Ок<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span>
        </button>
        <button onClick={onCancel} className={`${winOutline(dark)} flex-1`} style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

const PLEDGE_PLACES = ["Гардероб", "Сейф"];
const fmtDateOnlyInput = (d: Date) => toLocalInput(d).slice(0, 10);

function PledgeCellsWindow({ dark, pledges, onClose }: { dark: boolean; pledges: Pledge[]; onClose: () => void }) {
  const c = th(dark);
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const [place, setPlace] = useState("all");
  const [from, setFrom] = useState(fmtDateOnlyInput(weekAgo));
  const [to, setTo] = useState(fmtDateOnlyInput(tomorrow));
  const [onlyBusy, setOnlyBusy] = useState(true);
  const [query, setQuery] = useState("");
  useEscape(onClose);

  const fromTs = new Date(`${from}T00:00`).getTime();
  const toTs = new Date(`${to}T23:59`).getTime();
  const q = query.trim().toLowerCase();
  const rows = pledges
    .filter((p) => (place === "all" || p.place === place) && (!onlyBusy || !p.returnedAt) &&
      (isNaN(fromTs) || p.takenAt.getTime() >= fromTs) && (isNaN(toTs) || p.takenAt.getTime() <= toTs) &&
      (!q || [String(p.cell), p.type, p.card, p.comment].some((v) => v.toLowerCase().includes(q))))
    .sort((a, b) => a.cell - b.cell);
  const fieldStyle: React.CSSProperties = { backgroundColor: c.inputBg, color: c.textPrimary, colorScheme: dark ? "dark" : "light" };
  const label = (t: string) => <span className="text-[15px]" style={{ color: c.textSec }}>{t}</span>;

  return (
    <WinFrame dark={dark} title="Ячейки с залогом" width={1180} height={800} onClose={onClose}>
      <div className="flex items-center shrink-0" style={{ gap: 14, marginTop: 22 }}>
        {label("Место хранения")}
        <div className="relative" style={{ width: 230 }}>
          <select value={place} onChange={(e) => setPlace(e.target.value)} aria-label="Место хранения" className={`${winField(dark)} cursor-pointer w-full appearance-none pr-[38px]`} style={fieldStyle}>
            <option value="all">Все места хранения</option>
            {PLEDGE_PLACES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <span className="absolute pointer-events-none" style={{ right: 12, top: 15, color: c.textPrimary }}><AdChevron up={false} /></span>
        </div>
        {label("С")}
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Период с" className={`${winField(dark)} cursor-pointer`} style={{ ...fieldStyle, width: 170 }} />
        {label("До")}
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Период до" className={`${winField(dark)} cursor-pointer`} style={{ ...fieldStyle, width: 170 }} />
        <span className="flex-1" />
        <RetCheckbox checked={onlyBusy} onChange={() => setOnlyBusy((v) => !v)} label="Только занятые ячейки" dark={dark} />
      </div>
      <div className="flex justify-end shrink-0" style={{ marginTop: 14 }}>
        <div className="relative" style={{ width: 300 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск" aria-label="Поиск"
            className={`${winField(dark)} w-full pl-[42px]`} style={fieldStyle} />
          <svg viewBox="0 0 24 24" className="absolute pointer-events-none" style={{ left: 14, top: 14, width: 20, height: 20 }} fill="none">
            <circle cx="11" cy="11" r="6.5" stroke={c.textSec} strokeWidth="1.8" /><path d="M16 16L20 20" stroke={c.textSec} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-h-0" style={{ marginTop: 14 }}>
        <WinTable dark={dark} cols="0.7fr 1.3fr 1fr 1.6fr 1.3fr 1.3fr"
          headers={["Ячейка №", "Тип залога", "UID карты", "Комментарий к залогу", "Время взятия залога", "Время возврата"]}
          rows={rows.map((p) => ({ key: `${p.cell}-${p.takenAt.getTime()}`, cells: [p.cell, p.type, p.card, p.comment, fmtRowDate(p.takenAt), fmtRowDate(p.returnedAt)] }))}
          empty="Нет ячеек по заданным условиям" />
      </div>
      <div className="flex justify-end shrink-0" style={{ marginTop: 20 }}>
        <button onClick={onClose} className={winOutline(dark)} style={{ width: 200, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Закрыть<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

const SAMPLE_CLIENTS = [
  { name: "Маркина Мария Сергеевна", phone: "89123456788", email: "ds@gmail.com", uid: "4AB6EC76", board: "1024" },
  { name: "Данилов Андрей Викторович", phone: "89001112233", email: "danilov@mail.ru", uid: "73512AA4", board: "1031" },
  { name: "Петрова Ольга Ивановна", phone: "89215550101", email: "petrova@ya.ru", uid: "03F300A4", board: "" },
  { name: "Маркин Илья Петрович", phone: "89123456700", email: "markin@gmail.com", uid: "9F3B11E4", board: "1102" },
];
type SearchBy = "phone" | "email" | "name" | "uid";
const SEARCH_BY: { id: SearchBy; label: string }[] = [
  { id: "phone", label: "Телефон" }, { id: "email", label: "Почта" }, { id: "name", label: "ФИО" }, { id: "uid", label: "UID карты" },
];

type BlockReason = "Поломка" | "Потеря" | "Другое";
type BlockAction = "Замена" | "Блокировка с изъятием" | "Временная блокировка";
const BLOCK_REASONS: BlockReason[] = ["Поломка", "Потеря", "Другое"];
const BLOCK_ACTIONS: BlockAction[] = ["Замена", "Блокировка с изъятием", "Временная блокировка"];

function RadioRow<T extends string>({ dark, label, options, value, onChange }: { dark: boolean; label: string; options: T[]; value: T | null; onChange: (v: T) => void }) {
  const c = th(dark);
  return (
    <div>
      <p className="text-[15px] font-semibold" style={{ color: c.textPrimary, marginBottom: 10 }}>{label}</p>
      <div role="radiogroup" aria-label={label} className="flex items-center" style={{ gap: 28 }}>
        {options.map((o) => (
          <button key={o} role="radio" aria-checked={value === o} onClick={() => onChange(o)}
            className="group flex items-center gap-[8px] text-[15px] cursor-pointer select-none outline-none rounded-[6px] focus-visible:ring-2 focus-visible:ring-[#47d465]"
            style={{ color: c.textPrimary }}>
            <span className="flex items-center justify-center size-[20px] rounded-full transition-colors duration-150 group-hover:bg-[#47d465]/15 group-active:bg-[#47d465]/30"
              style={{ boxShadow: "inset 0 0 0 1.5px #47d465" }}>
              {value === o && <span className="size-[10px] rounded-full bg-[#47d465]" />}
            </span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ClientSearchWindow({ dark, onClose, onOk, title = "Поиск клиента", withBlock = false }: {
  dark: boolean; onClose: () => void; title?: string; withBlock?: boolean;
  onOk: (client: (typeof SAMPLE_CLIENTS)[number], block?: { reason: BlockReason; action: BlockAction }) => void;
}) {
  const [reason, setReason] = useState<BlockReason | null>(null);
  const [blockAction, setBlockAction] = useState<BlockAction | null>(null);
  const c = th(dark);
  const [query, setQuery] = useState("");
  const [by, setBy] = useState<SearchBy>("uid");
  const [results, setResults] = useState<typeof SAMPLE_CLIENTS | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  useEscape(onClose);

  const runSearch = (q = query, mode = by) => {
    const raw = q.trim().toLowerCase();
    if (!raw) return;
    const needle = mode === "phone" ? raw.replace(/\D/g, "") : raw.replace(/\s+/g, " ");
    const found = SAMPLE_CLIENTS.filter((cl) => {
      const v = mode === "phone" ? cl.phone : mode === "email" ? cl.email : mode === "name" ? cl.name : cl.uid;
      return needle !== "" && v.toLowerCase().includes(needle);
    });
    setResults(found);
    setPicked(found.length === 1 ? found[0].uid : null);
  };
  const pickedClient = results?.find((cl) => cl.uid === picked) ?? null;
  const canOk = !!pickedClient && (!withBlock || (!!reason && !!blockAction));
  const confirm = () => {
    if (!canOk || !pickedClient) return;
    onOk(pickedClient, withBlock && reason && blockAction ? { reason, action: blockAction } : undefined);
  };
  const readCard = () => {
    const cl = SAMPLE_CLIENTS[Math.floor(Math.random() * SAMPLE_CLIENTS.length)];
    setBy("uid"); setQuery(cl.uid); runSearch(cl.uid, "uid");
  };
  const fieldStyle: React.CSSProperties = { backgroundColor: c.inputBg, color: c.textPrimary };

  return (
    <WinFrame dark={dark} title={title} width={860} height={withBlock ? 900 : 680} onClose={onClose}>
      <div className="flex shrink-0" style={{ gap: 12, marginTop: 22 }}>
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { if (canOk) confirm(); else runSearch(); } }}
          placeholder={by === "phone" ? "8 900 000 00 00" : by === "email" ? "name@mail.ru" : by === "name" ? "Фамилия Имя Отчество" : "UID карты"}
          aria-label="Строка поиска" className={`${winField(dark)} flex-1`} style={fieldStyle} />
        <button onClick={() => runSearch()} className={winGreen(!!query.trim())} style={{ width: 170, height: 48 }}>Поиск</button>
      </div>
      <div className="flex items-center shrink-0" style={{ gap: 12, marginTop: 14 }}>
        <div role="radiogroup" aria-label="Искать по" className="flex-1 flex items-center rounded-[10px]" style={{ height: 52, padding: "0 16px", gap: 22, backgroundColor: c.inputBg }}>
          {SEARCH_BY.map((s) => (
            <button key={s.id} role="radio" aria-checked={by === s.id} onClick={() => setBy(s.id)}
              className="group flex items-center gap-[8px] text-[15px] cursor-pointer select-none outline-none rounded-[6px] focus-visible:ring-2 focus-visible:ring-[#47d465]"
              style={{ color: c.textPrimary }}>
              <span className="flex items-center justify-center size-[20px] rounded-full transition-colors duration-150 group-hover:bg-[#47d465]/15 group-active:bg-[#47d465]/30"
                style={{ boxShadow: "inset 0 0 0 1.5px #47d465" }}>
                {by === s.id && <span className="size-[10px] rounded-full bg-[#47d465]" />}
              </span>
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={readCard} className={winOutline(dark)} style={{ width: 170, height: 52, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>Считайте карту</button>
      </div>
      <p className="text-[15px] font-semibold shrink-0" style={{ color: c.textPrimary, marginTop: 18, marginBottom: 10 }}>Выберите карту</p>
      <div className="flex flex-col flex-1 min-h-0">
        <WinTable dark={dark} cols="2fr 1fr 1fr" headers={["ФИО", "UID карты", "Бортовой номер"]}
          rows={(results ?? []).map((cl) => ({ key: cl.uid, cells: [cl.name, cl.uid, cl.board] }))}
          activeKey={picked} onRowClick={setPicked}
          empty={results === null ? "Введите запрос и нажмите «Поиск» или считайте карту" : "Клиенты не найдены"} />
      </div>
      {withBlock && (
        <div className="flex flex-col shrink-0" style={{ gap: 18, marginTop: 20 }}>
          <RadioRow dark={dark} label="Причина" options={BLOCK_REASONS} value={reason} onChange={setReason} />
          <RadioRow dark={dark} label="Действие" options={BLOCK_ACTIONS} value={blockAction} onChange={setBlockAction} />
        </div>
      )}
      <div className="flex justify-end shrink-0" style={{ gap: 12, marginTop: 20 }}>
        <button onClick={confirm} className={winGreen(canOk)} style={{ width: 180 }}>
          OK<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span>
        </button>
        <button onClick={onClose} className={winOutline(dark)} style={{ width: 180, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

function CardHistoryWindow({ dark, card, onClose }: { dark: boolean; card: string; onClose: () => void }) {
  const c = th(dark);
  const start = new Date(); start.setDate(start.getDate() - 14); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setDate(end.getDate() + 1); end.setHours(0, 0, 0, 0);
  const [from, setFrom] = useState(toLocalInput(start));
  const [to, setTo] = useState(toLocalInput(end));
  const [picked, setPicked] = useState<string | null>(null);
  useEscape(onClose);
  const history = useRef((() => {
    if (!cardHasData(card)) return [] as { id: string; client: string; sold: Date; returned: Date | null }[];
    const at = (daysAgo: number, h: number, m: number) => { const d = new Date(); d.setDate(d.getDate() - daysAgo); d.setHours(h, m, 0, 0); return d; };
    return [
      { id: "1", client: "700771", sold: at(12, 11, 5), returned: at(12, 18, 40) },
      { id: "2", client: "700771", sold: at(6, 10, 20), returned: null },
      { id: "3", client: "700812", sold: at(1, 15, 2), returned: at(0, 9, 30) },
    ];
  })()).current;
  const fromTs = new Date(from).getTime();
  const toTs = new Date(to).getTime();
  const rows = history.filter((h) => (isNaN(fromTs) || h.sold.getTime() >= fromTs) && (isNaN(toTs) || h.sold.getTime() < toTs));
  const fieldStyle: React.CSSProperties = { backgroundColor: c.inputBg, color: c.textPrimary, colorScheme: dark ? "dark" : "light" };

  return (
    <WinFrame dark={dark} title="История по карте" subtitle={`Карта ${card}`} width={900} height={680} onClose={onClose}>
      <div className="flex items-center shrink-0" style={{ gap: 14, marginTop: 22 }}>
        <span className="text-[15px]" style={{ color: c.textSec }}>Дата продажи</span>
        <span className="text-[15px]" style={{ color: c.textSec }}>С</span>
        <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Дата продажи с" className={`${winField(dark)} cursor-pointer`} style={{ ...fieldStyle, width: 220 }} />
        <span className="text-[15px]" style={{ color: c.textSec }}>До</span>
        <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Дата продажи до" className={`${winField(dark)} cursor-pointer`} style={{ ...fieldStyle, width: 220 }} />
      </div>
      <div className="flex flex-col flex-1 min-h-0" style={{ marginTop: 18 }}>
        <WinTable dark={dark} cols="1fr 1fr 1fr 1fr" headers={["Идентификатор карты", "Идентификатор клиента", "Дата продажи", "Дата возврата"]}
          rows={rows.map((h) => ({ key: h.id, cells: [card, h.client, fmtRowDate(h.sold), fmtRowDate(h.returned)] }))}
          activeKey={picked} onRowClick={setPicked} empty="Нет операций за выбранный период" />
      </div>
      <div className="flex justify-end shrink-0" style={{ gap: 12, marginTop: 20 }}>
        <button onClick={() => picked && onClose()} className={winGreen(!!picked)} style={{ width: 180 }}>
          OK<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span>
        </button>
        <button onClick={onClose} className={winOutline(dark)} style={{ width: 180, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

// ─── Preorders ────────────────────────────────────────────────────────────────

interface PreorderItem { id: number; name: string; qty: number; price: number; sold: boolean; }
interface PreorderContact { name: string; phone: string; email: string; uid?: string; }
interface PreorderCompany { name: string; inn: string; }
interface Preorder {
  no: number; date: string; name: string; phone: string; email: string; birth: string; gender: string;
  contact: PreorderContact | null; company: PreorderCompany | null; items: PreorderItem[];
}

const SAMPLE_COMPANIES: PreorderCompany[] = [
  { name: "ООО «Ромашка»", inn: "7701234567" },
  { name: "АО «Парк развлечений»", inn: "7812345678" },
  { name: "ИП Иванов Сергей Петрович", inn: "502912345678" },
  { name: "ООО «Детский праздник»", inn: "6658123456" },
];

function seedPreorders(): Preorder[] {
  const items = (n: number, start: number): PreorderItem[] =>
    Array.from({ length: n }, (_, i) => ({ id: start + i, name: "Билет 1 час детский", qty: 1, price: 100, sold: false }));
  return [
    { no: 11500, date: "2026-10-13", name: "ДР группа", phone: "89123456788", email: "ds@gmail.com", birth: "", gender: "", contact: null, company: null, items: items(7, 1) },
    { no: 11600, date: "2026-10-18", name: "Выпускной 4Б", phone: "89001112233", email: "danilov@mail.ru", birth: "", gender: "",
      contact: { name: "Данилов Андрей Викторович", phone: "89001112233", email: "danilov@mail.ru", uid: "73512AA4" },
      company: SAMPLE_COMPANIES[3], items: [...items(3, 20), { id: 30, name: "Безлимит", qty: 1, price: 800, sold: true }] },
  ];
}
const fmtIsoDate = (iso: string) => (iso ? iso.split("-").reverse().join(".") : "");
const fmtPhone = (d: string) => (d.length === 11 ? `${d[0]} ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}` : d);

// Searchable picker: type to filter `options`, pick one; shows the choice as a chip.
function LinkPicker<T>({ dark, label, placeholder, options, value, onChange, getTitle, getSub, allowFree, freeLabel }: {
  dark: boolean; label: string; placeholder: string; options: T[]; value: T | null; onChange: (v: T | null) => void;
  getTitle: (o: T) => string; getSub: (o: T) => string; allowFree?: (text: string) => T; freeLabel?: string;
}) {
  const c = th(dark);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  const needle = q.trim().toLowerCase();
  const list = options.filter((o) => !needle || `${getTitle(o)} ${getSub(o)}`.toLowerCase().replace(/\s/g, "").includes(needle.replace(/\s/g, "")));
  const hover = dark ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-black/[0.035] active:bg-black/[0.07]";

  return (
    <div ref={ref} className="relative">
      <p className="text-[13px]" style={{ color: c.textSec, marginBottom: 6 }}>{label}</p>
      {value ? (
        <div className="flex items-center gap-[12px] rounded-[10px]" style={{ height: 56, padding: "0 8px 0 16px", backgroundColor: dark ? "#1f4a2a" : "#dffbe6" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" stroke="#2fae4c" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold truncate" style={{ color: c.textPrimary }}>{getTitle(value)}</p>
            <p className="text-[12px] truncate" style={{ color: c.textSec }}>{getSub(value)}</p>
          </div>
          <button onClick={() => onChange(null)} aria-label="Отвязать"
            className={`h-[38px] px-[12px] rounded-[8px] text-[13px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}
            style={{ color: c.textPrimary }}>Отвязать</button>
        </div>
      ) : (
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder={placeholder} aria-label={label}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          className={`w-full ${winField(dark)}`} style={{ height: 56, backgroundColor: "transparent", color: c.textPrimary, boxShadow: `inset 0 0 0 1px ${c.divider}` }} />
      )}
      {open && !value && (
        <div className={`absolute left-0 right-0 rounded-[10px] ${RET_SCROLL}`}
          style={{ top: "calc(100% + 6px)", zIndex: 5, maxHeight: 236, backgroundColor: c.sidebarBg, boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}>
          {list.map((o) => (
            <button key={getTitle(o) + getSub(o)} onClick={() => { onChange(o); setQ(""); setOpen(false); }}
              className={`w-full text-left cursor-pointer select-none outline-none transition-colors duration-150 focus-visible:bg-[#47d465]/10 ${hover}`}
              style={{ padding: "10px 16px", borderTop: `1px solid ${c.divider}` }}>
              <p className="text-[14px] font-semibold" style={{ color: c.textPrimary }}>{getTitle(o)}</p>
              <p className="text-[12px]" style={{ color: c.textSec }}>{getSub(o)}</p>
            </button>
          ))}
          {allowFree && q.trim() && (
            <button onClick={() => { onChange(allowFree(q.trim())); setQ(""); setOpen(false); }}
              className={`w-full text-left cursor-pointer select-none outline-none text-[14px] font-semibold transition-colors duration-150 ${hover}`}
              style={{ padding: "14px 16px", borderTop: `1px solid ${c.divider}`, color: "#2fae4c" }}>
              + {freeLabel} «{q.trim()}»
            </button>
          )}
          {list.length === 0 && !(allowFree && q.trim()) && (
            <p className="text-[14px]" style={{ padding: "14px 16px", color: c.textSec }}>Ничего не найдено</p>
          )}
        </div>
      )}
    </div>
  );
}

function CreatePreorderDrawer({ dark, onClose, onSave }: { dark: boolean; onClose: () => void; onSave: (p: Omit<Preorder, "no" | "items">) => void }) {
  const c = th(dark);
  const [date, setDate] = useState(fmtDateOnlyInput(new Date()));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState<PreorderContact | null>(null);
  const [company, setCompany] = useState<PreorderCompany | null>(null);
  const [tried, setTried] = useState(false);
  useEscape(onClose);

  const phoneDigits = phone.replace(/\D/g, "");
  const errors = {
    date: !date, name: !name.trim(),
    phone: !/^[78]\d{10}$/.test(phoneDigits),
    email: !/^\S+@\S+\.\S+$/.test(email.trim()),
  };
  const valid = !Object.values(errors).some(Boolean);

  // Linking a contact from the base fills the contact fields from their profile.
  const linkContact = (cl: PreorderContact | null) => {
    setContact(cl);
    if (cl) { setPhone(fmtPhone(cl.phone)); setEmail(cl.email); }
  };
  const save = () => {
    setTried(true);
    if (!valid) return;
    onSave({ date, name: name.trim(), phone: phoneDigits, email: email.trim(), birth, gender, contact, company });
  };

  const fieldStyle = (bad: boolean): React.CSSProperties => ({
    backgroundColor: c.inputBg, color: c.textPrimary, colorScheme: dark ? "dark" : "light",
    boxShadow: tried && bad ? "inset 0 0 0 1.5px rgba(249,91,28,0.6)" : undefined,
  });
  const label = (t: string, req?: boolean) => (
    <p className="text-[13px]" style={{ color: c.textSec, marginBottom: 6 }}>{t}{req && <span style={{ color: "#F95B1C" }}>*</span>}</p>
  );

  return (
    <div className="absolute inset-0" style={{ zIndex: 45 }}>
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onClose} />
      <div role="dialog" aria-label="Создать предзаказ" className="absolute top-0 right-0 bottom-0 flex flex-col transition-colors duration-300"
        style={{ width: 760, backgroundColor: c.sidebarBg, boxShadow: "-12px 0 40px rgba(0,0,0,0.18)", animation: "preorderDrawerIn 220ms ease-out" }}>
        <style>{"@keyframes preorderDrawerIn{from{transform:translateX(40px);opacity:.4}to{transform:none;opacity:1}}"}</style>
        <div className="flex items-center justify-between shrink-0" style={{ padding: "30px 28px 10px 48px" }}>
          <p className="font-bold text-[22px]" style={{ color: c.textPrimary }}>Создать предзаказ</p>
          <button onClick={onClose} aria-label="Закрыть"
            className="flex items-center justify-center size-[40px] rounded-[8px] cursor-pointer select-none outline-none transition-all duration-150 hover:bg-black/10 active:bg-black/15 active:scale-90 focus-visible:shadow-[inset_0_0_0_2px_#47d465]">
            <svg viewBox="0 0 24 24" className="size-[22px]" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className={`flex-1 min-h-0 flex flex-col ${RET_SCROLL}`} style={{ padding: "10px 48px 20px", gap: 16 }}>
          <div>{label("Дата", true)}<input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Дата" className={`w-full ${winField(dark)} cursor-pointer`} style={{ ...fieldStyle(errors.date), height: 52 }} /></div>
          <div>{label("Название", true)}<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, ДР группа" aria-label="Название" className={`w-full ${winField(dark)}`} style={{ ...fieldStyle(errors.name), height: 52 }} /></div>

          <div className="rounded-[10px] flex flex-col" style={{ padding: 16, gap: 14, boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
            <p className="text-[15px] font-semibold" style={{ color: c.textPrimary }}>Привязка</p>
            <LinkPicker dark={dark} label="Контакт из базы" placeholder="Найти по ФИО, телефону, почте или UID карты"
              options={SAMPLE_CLIENTS as PreorderContact[]} value={contact} onChange={linkContact}
              getTitle={(o) => o.name} getSub={(o) => `${fmtPhone(o.phone)} · ${o.email}${o.uid ? ` · UID ${o.uid}` : ""}`} />
            <LinkPicker dark={dark} label="Юридическое лицо" placeholder="Введите название компании или ИНН"
              options={SAMPLE_COMPANIES} value={company} onChange={setCompany}
              getTitle={(o) => o.name} getSub={(o) => (o.inn ? `ИНН ${o.inn}` : "Новая компания")}
              allowFree={(text) => ({ name: text, inn: "" })} freeLabel="Добавить компанию" />
          </div>

          <div>{label("Номер телефона", true)}<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="8 900 000 00 00" inputMode="tel" aria-label="Номер телефона" className={`w-full ${winField(dark)}`} style={{ ...fieldStyle(errors.phone), height: 52 }} /></div>
          <div className="flex" style={{ gap: 16 }}>
            <div className="flex-1">{label("Дата рождения")}<input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} aria-label="Дата рождения" className={`w-full ${winField(dark)} cursor-pointer`} style={{ ...fieldStyle(false), height: 52 }} /></div>
            <div className="flex-1">
              {label("Пол")}
              <div className="relative">
                <select value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Пол" className={`w-full ${winField(dark)} cursor-pointer appearance-none pr-[38px]`} style={{ ...fieldStyle(false), height: 52 }}>
                  <option value="">Не указан</option><option>Женский</option><option>Мужской</option>
                </select>
                <span className="absolute pointer-events-none" style={{ right: 12, top: 17, color: c.textPrimary }}><AdChevron up={false} /></span>
              </div>
            </div>
          </div>
          <div>{label("E-mail", true)}<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@mail.ru" aria-label="E-mail" className={`w-full ${winField(dark)}`} style={{ ...fieldStyle(errors.email), height: 52 }} /></div>
          {tried && !valid && <p className="text-[13px]" style={{ color: "#F95B1C" }}>Заполните обязательные поля: дата, название, телефон (11 цифр) и e-mail.</p>}
        </div>
        <div className="shrink-0" style={{ padding: "16px 48px 32px", borderTop: `1px solid ${c.divider}` }}>
          <button onClick={save} className={winGreen(true)} style={{ width: 250 }}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

function PreorderScreen({ dark, onClose, onAddToSale }: { dark: boolean; onClose: () => void; onAddToSale: (items: PreorderItem[]) => void }) {
  const c = th(dark);
  const [orders, setOrders] = useState<Preorder[]>(seedPreorders);
  const [activeNo, setActiveNo] = useState<number>(orders[0].no);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  useEffect(() => { if (!linkCopied) return; const t = setTimeout(() => setLinkCopied(false), 1800); return () => clearTimeout(t); }, [linkCopied]);
  useEscape(() => { if (!creating) onClose(); });

  const q = query.trim().toLowerCase();
  const qDigits = q.replace(/\D/g, "");
  const visible = orders.filter((o) => !q ||
    (qDigits.length >= 3 && o.phone.includes(qDigits)) || fmtIsoDate(o.date).includes(q) ||
    o.name.toLowerCase().includes(q) || String(o.no).includes(q) ||
    (o.company?.name.toLowerCase().includes(q) ?? false) || (o.contact?.name.toLowerCase().includes(q) ?? false));
  const active = orders.find((o) => o.no === activeNo) ?? null;
  const openItems = active?.items.filter((i) => !i.sold) ?? [];
  const allChecked = openItems.length > 0 && openItems.every((i) => checked.has(i.id));
  const selected = openItems.filter((i) => checked.has(i.id));
  const totalQty = active?.items.reduce((s, i) => s + i.qty, 0) ?? 0;
  const totalSum = active?.items.reduce((s, i) => s + i.qty * i.price, 0) ?? 0;

  const pick = (no: number) => { setActiveNo(no); setChecked(new Set()); };
  const toggle = (id: number) => setChecked((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleSold = (id: number) => setOrders((prev) => prev.map((o) => (o.no !== activeNo ? o : { ...o, items: o.items.map((i) => (i.id === id ? { ...i, sold: !i.sold } : i)) })));
  const addToSale = () => {
    if (selected.length === 0) return;
    onAddToSale(selected);
    setOrders((prev) => prev.map((o) => (o.no !== activeNo ? o : { ...o, items: o.items.map((i) => (checked.has(i.id) ? { ...i, sold: true } : i)) })));
    setChecked(new Set());
  };
  const copyLink = () => {
    try { void navigator.clipboard?.writeText(`https://pay.example.ru/prepay/${activeNo}`); } catch { /* clipboard unavailable — still show feedback */ }
    setLinkCopied(true);
  };

  const mint = dark ? "#1f4a2a" : "#dffbe6";
  const rowHover = dark ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-black/[0.035] active:bg-black/[0.07]";
  const panel: React.CSSProperties = { backgroundColor: c.sidebarBg, boxShadow: `inset 0 0 0 1px ${c.divider}` };
  const LEFT_COLS = "0.8fr 1fr 1.6fr";
  const RIGHT_COLS = "110px 1.8fr 0.7fr 0.7fr 90px";

  return (
    <div className="absolute inset-0 flex flex-col transition-colors duration-300" style={{ zIndex: 38, backgroundColor: c.screenBg, padding: "18px 32px 28px 99px" }}>
      <div className="flex items-center shrink-0" style={{ gap: 24, height: 56 }}>
        <button onClick={onClose} aria-label="Назад"
          className="flex items-center gap-[10px] cursor-pointer select-none outline-none rounded-[8px] transition-opacity duration-150 hover:opacity-70 active:opacity-50 focus-visible:ring-2 focus-visible:ring-[#47d465]">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M15 5l-7 7 7 7" stroke={c.textPrimary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="font-bold text-[24px] tracking-[0.3px] whitespace-nowrap" style={{ color: c.textPrimary }}>Управление предзаказами</span>
        </button>
        <div className="relative" style={{ width: 420 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Искать по телефону или дате" aria-label="Поиск предзаказа"
            className={`w-full ${winField(dark)} pr-[44px]`} style={{ height: 48, backgroundColor: c.sidebarBg, color: c.textPrimary }} />
          <svg viewBox="0 0 24 24" className="absolute pointer-events-none" style={{ right: 14, top: 13, width: 22, height: 22 }} fill="none">
            <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={c.textSec} strokeWidth="1.5" /><path d="M3.5 9.5H20.5M8 3v4M16 3v4" stroke={c.textSec} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="flex-1" />
        <button onClick={() => setCreating(true)}
          className="flex items-center gap-[10px] h-[48px] px-[20px] rounded-[10px] bg-[#303030] text-white text-[15px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#47d465]">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
          Создать предзаказ
        </button>
      </div>

      <div className="flex flex-1 min-h-0" style={{ gap: 16, marginTop: 28 }}>
        <section className="flex-1 min-w-0 flex flex-col rounded-[10px] overflow-hidden" style={panel}>
          <div className="grid items-center shrink-0 text-[14px]" style={{ gridTemplateColumns: LEFT_COLS, height: 50, padding: "0 18px", backgroundColor: mint, color: c.textPrimary }}>
            <span>№</span><span>Дата</span><span>Название</span>
          </div>
          <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
            {visible.length === 0 && <p className="text-center text-[14px]" style={{ color: c.textSec, padding: "40px 20px" }}>Предзаказы не найдены</p>}
            {visible.map((o) => {
              const on = o.no === activeNo;
              return (
                <button key={o.no} onClick={() => pick(o.no)}
                  className={`w-full grid items-center text-left text-[14px] cursor-pointer select-none outline-none transition-colors duration-150 focus-visible:bg-[#47d465]/10 ${on ? "" : rowHover}`}
                  style={{ gridTemplateColumns: LEFT_COLS, minHeight: 50, padding: "8px 18px", color: c.textPrimary, backgroundColor: on ? c.inputBg : undefined, borderTop: `1px solid ${c.divider}`, fontFeatureSettings: '"lnum","pnum"' }}>
                  <span className={on ? "font-semibold" : ""}>{o.no}</span>
                  <span>{fmtIsoDate(o.date)}</span>
                  <span className="min-w-0">
                    <span className="block truncate">{o.name}</span>
                    {(o.company || o.contact) && (
                      <span className="block truncate text-[12px]" style={{ color: c.textSec }}>{[o.company?.name, o.contact?.name].filter(Boolean).join(" · ")}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex-1 min-w-0 flex flex-col rounded-[10px] overflow-hidden" style={panel}>
          {active ? (
            <>
              <div className="flex items-center shrink-0 text-[14px]" style={{ gap: 24, height: 50, padding: "0 18px", backgroundColor: mint, color: c.textPrimary }}>
                <span>№ {active.no}</span><span className="font-semibold truncate">{active.name}</span>
                <span className="flex-1" />
                <span className="truncate text-[12px]" style={{ color: c.textSec }}>{fmtPhone(active.phone)}</span>
              </div>
              {(active.contact || active.company) && (
                <div className="flex flex-wrap shrink-0" style={{ gap: 8, padding: "10px 18px 0" }}>
                  {active.contact && <span className="text-[12px] rounded-full px-[10px] py-[4px]" style={{ backgroundColor: c.inputBg, color: c.textPrimary }}>Контакт: {active.contact.name}</span>}
                  {active.company && <span className="text-[12px] rounded-full px-[10px] py-[4px]" style={{ backgroundColor: c.inputBg, color: c.textPrimary }}>Юр. лицо: {active.company.name}{active.company.inn ? ` · ИНН ${active.company.inn}` : ""}</span>}
                </div>
              )}
              <div className="grid items-center shrink-0 text-[14px]" style={{ gridTemplateColumns: RIGHT_COLS, height: 46, padding: "0 18px", color: c.textSec }}>
                <span className="flex items-center gap-[8px]">
                  <RetCheckbox checked={allChecked} onChange={() => setChecked(allChecked ? new Set() : new Set(openItems.map((i) => i.id)))} label={undefined} dark={dark} />
                  <span className="text-[13px]">Все</span>
                </span>
                <span>Название</span><span className="text-center">Кол-во</span><span className="text-center">Цена</span><span className="text-center">Продано</span>
              </div>
              <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
                {active.items.length === 0 && <p className="text-center text-[14px]" style={{ color: c.textSec, padding: "40px 20px" }}>В предзаказе пока нет позиций</p>}
                {active.items.map((i) => (
                  <div key={i.id} className={`grid items-center text-[14px] transition-colors duration-150 ${rowHover}`}
                    style={{ gridTemplateColumns: RIGHT_COLS, height: 52, padding: "0 18px", color: c.textPrimary, borderTop: `1px solid ${c.divider}`, opacity: i.sold ? 0.55 : 1, fontFeatureSettings: '"lnum","pnum"' }}>
                    <span>{!i.sold && <RetCheckbox checked={checked.has(i.id)} onChange={() => toggle(i.id)} dark={dark} />}</span>
                    <span className="truncate pr-[8px]">{i.name}</span>
                    <span className="text-center">{i.qty}</span>
                    <span className="text-center">{i.price}</span>
                    <span className="flex justify-center"><RetCheckbox checked={i.sold} onChange={() => toggleSold(i.id)} label={undefined} dark={dark} /></span>
                  </div>
                ))}
              </div>
              <div className="shrink-0 flex items-center" style={{ gap: 24, padding: "14px 18px", borderTop: `1px solid ${c.divider}`, color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>
                <span className="text-[14px]">Кол-во: <b>{totalQty}</b></span>
                <span className="text-[14px]">Сумма: <b>{totalSum.toFixed(2)}</b></span>
                <span className="flex-1" />
                <button onClick={copyLink}
                  className={`flex items-center gap-[8px] h-[40px] px-[12px] rounded-[8px] text-[14px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-[#f0fdf4] active:bg-[#dcfce7]"}`}
                  style={{ color: "#2fae4c" }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" stroke="#2fae4c" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  {linkCopied ? "Ссылка скопирована" : "Ссылка на предоплату"}
                </button>
              </div>
              <div className="shrink-0 flex justify-end" style={{ padding: "0 18px 18px" }}>
                <button onClick={addToSale} className={winGreen(selected.length > 0)} style={{ width: 260 }}>
                  Добавить в продажу{selected.length > 0 ? ` (${selected.length})` : ""}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-[14px]" style={{ color: c.textSec, padding: "40px 20px" }}>Выберите предзаказ</p>
          )}
        </section>
      </div>

      {creating && (
        <CreatePreorderDrawer dark={dark} onClose={() => setCreating(false)}
          onSave={(data) => {
            const no = Math.max(...orders.map((o) => o.no)) + 100;
            setOrders((prev) => [{ ...data, no, items: [] }, ...prev]);
            pick(no);
            setQuery("");
            setCreating(false);
          }} />
      )}
    </div>
  );
}

// ─── Merge client accounts ───────────────────────────────────────────────────
type SampleClient = (typeof SAMPLE_CLIENTS)[number];
const accountOf = (cl: SampleClient) => {
  const k = cl.uid.charCodeAt(cl.uid.length - 1) % 5;
  return { deposit: 500 + k * 300, bonuses: 50 + k * 40, tickets: 1 + (k % 3) };
};

function MergeAccountsWindow({ dark, onClose, onMerged }: { dark: boolean; onClose: () => void; onMerged: (left: SampleClient, right: SampleClient) => void }) {
  const c = th(dark);
  const [left, setLeft] = useState<SampleClient | null>(null);
  const [right, setRight] = useState<SampleClient | null>(null);
  const [searchSide, setSearchSide] = useState<"left" | "right" | null>(null);
  useEscape(() => { if (!searchSide) onClose(); });

  const same = !!left && !!right && left.uid === right.uid;
  const ready = !!left && !!right && !same;
  const status = !left || !right ? "Выберите клиентов с обеих сторон (слева и справа)"
    : same ? "Нельзя объединить счёт клиента с самим собой — выберите другого клиента"
    : `Счёт «${right.name}» будет присоединён к счёту «${left.name}». Правый счёт после слияния будет закрыт.`;

  const side = (key: "left" | "right", title: string, cl: SampleClient | null, set: (v: SampleClient | null) => void) => {
    const acc = cl ? accountOf(cl) : null;
    return (
      <div className="flex-1 min-w-0 flex flex-col rounded-[10px]" style={{ padding: "18px 20px", backgroundColor: c.inputBg, minHeight: 92 }}>
        <div className="flex items-center justify-between" style={{ gap: 12 }}>
          <p className="text-[15px] font-bold" style={{ color: c.textPrimary }}>{title}</p>
          <div className="flex" style={{ gap: 8 }}>
            {cl && (
              <button onClick={() => set(null)}
                className={`h-[44px] px-[14px] rounded-[10px] text-[14px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}
                style={{ color: c.textSec }}>Очистить</button>
            )}
            <button onClick={() => setSearchSide(key)} className={winOutline(dark)} style={{ height: 44, padding: "0 18px", color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
              Поиск клиента…
            </button>
          </div>
        </div>
        {cl && acc && (
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginTop: 16, fontFeatureSettings: '"lnum","pnum"' }}>
            {[["ФИО", cl.name], ["UID карты", cl.uid], ["Телефон", fmtPhone(cl.phone)], ["E-mail", cl.email],
              ["Депозит", `${acc.deposit} ₽`], ["Бонусы", String(acc.bonuses)], ["Активные билеты", String(acc.tickets)], ["Бортовой номер", cl.board || "—"]].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <p className="text-[12px]" style={{ color: c.textSec }}>{k}</p>
                <p className="text-[15px] font-semibold truncate" style={{ color: c.textPrimary }}>{v}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const total = left && right && !same ? { deposit: accountOf(left).deposit + accountOf(right).deposit, bonuses: accountOf(left).bonuses + accountOf(right).bonuses, tickets: accountOf(left).tickets + accountOf(right).tickets } : null;

  return (
    <>
      <WinFrame dark={dark} title="Слияние счетов клиентов" width={1180} onClose={onClose}>
        <div className="flex items-start shrink-0" style={{ gap: 12, marginTop: 24 }}>
          {side("left", "Левый счет", left, setLeft)}
          <button onClick={() => { setLeft(right); setRight(left); }} aria-label="Поменять счета местами" disabled={!left && !right}
            className={`shrink-0 self-start flex items-center justify-center size-[44px] rounded-[10px] select-none outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#47d465] ${!left && !right ? "opacity-35 cursor-default" : `cursor-pointer active:scale-90 ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}`}
            style={{ marginTop: 24 }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M7 7h12l-3-3M17 17H5l3 3" stroke={c.textPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {side("right", "Правый счет", right, setRight)}
        </div>
        <div className="flex items-center justify-center rounded-[10px] shrink-0 text-center text-[16px] font-semibold"
          style={{ marginTop: 20, minHeight: 56, padding: "12px 20px",
            color: ready ? "#2fae4c" : "#e5484d",
            backgroundColor: ready ? (dark ? "rgba(71,212,101,0.12)" : "#effcf2") : (dark ? "rgba(229,72,77,0.12)" : "#fdeeee"),
            boxShadow: `inset 0 0 0 1px ${ready ? "rgba(71,212,101,0.5)" : "rgba(229,72,77,0.45)"}` }}>
          {status}
        </div>
        {total && (
          <p className="text-[14px] shrink-0" style={{ color: c.textSec, marginTop: 14, fontFeatureSettings: '"lnum","pnum"' }}>
            После слияния: депозит <b style={{ color: c.textPrimary }}>{total.deposit} ₽</b> · бонусы <b style={{ color: c.textPrimary }}>{total.bonuses}</b> · активные билеты <b style={{ color: c.textPrimary }}>{total.tickets}</b>
          </p>
        )}
        <div className="flex justify-end shrink-0" style={{ gap: 12, marginTop: 28 }}>
          <button onClick={() => ready && left && right && onMerged(left, right)} className={winGreen(ready)} style={{ width: 230 }}>Объединить счета</button>
          <button onClick={onClose} className={winOutline(dark)} style={{ width: 180, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
            Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
          </button>
        </div>
      </WinFrame>
      {searchSide && (
        <ClientSearchWindow dark={dark} title={searchSide === "left" ? "Левый счет: поиск клиента" : "Правый счет: поиск клиента"}
          onClose={() => setSearchSide(null)}
          onOk={(cl) => { (searchSide === "left" ? setLeft : setRight)(cl); setSearchSide(null); }} />
      )}
    </>
  );
}

// ─── Fake loading, ticket extension, acquiring journal, cash, report images ──

// Full-screen "Загрузка" with the Lime logo spinning clockwise (used for 3 s fake operations).
function LoadingOverlay({ dark }: { dark: boolean }) {
  const c = th(dark);
  return (
    <div role="status" aria-live="polite" className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 90, backgroundColor: dark ? "rgba(20,20,20,0.55)" : "rgba(64,62,62,0.35)" }}>
      <style>{"@keyframes limeSpin{to{transform:rotate(360deg)}}@keyframes limeDots{0%,20%{opacity:.2}50%{opacity:1}100%{opacity:.2}}"}</style>
      <div className="flex flex-col items-center rounded-[16px]" style={{ padding: "36px 56px 30px", gap: 22, backgroundColor: c.sidebarBg, boxShadow: "0 16px 50px rgba(0,0,0,0.22)" }}>
        <div style={{ width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", animation: "limeSpin 1.1s linear infinite" }}>
          <div style={{ transform: "scale(2.6)" }}><IconLogo /></div>
        </div>
        <p className="text-[20px] font-bold" style={{ color: c.textPrimary }}>
          Загрузка
          {[0, 1, 2].map((i) => <span key={i} style={{ animation: `limeDots 1.2s ${i * 0.2}s infinite` }}>.</span>)}
        </p>
      </div>
    </div>
  );
}

// ── Расширить билет ──
interface ExtendRow { id: number; name: string; from: string; to: string; comment: string; ext: string; qty: number; extra: number; locked?: boolean; }

function buildExtendRows(): ExtendRow[] {
  const now = new Date();
  const later = new Date(now); later.setDate(later.getDate() + 1);
  const past = new Date(now); past.setMonth(past.getMonth() - 2); past.setHours(11, 16, 0, 0);
  return [
    { id: 1, name: "3 круга", from: fmtRowDate(past), to: "", comment: "Запрещено настройками тарифа", ext: "Билет мероприятия", qty: 1, extra: 0, locked: true },
    { id: 2, name: "Входной билет", from: fmtRowDate(now), to: fmtRowDate(later), comment: "", ext: "Спа", qty: 1, extra: 350 },
    { id: 3, name: "Безлимит", from: fmtRowDate(now), to: fmtRowDate(later), comment: "", ext: "Безлимит VIP", qty: 2, extra: 200 },
  ];
}

function ExtendTicketWindow({ dark, card, onClose, onConfirm }: { dark: boolean; card: string; onClose: () => void; onConfirm: (rows: ExtendRow[]) => void }) {
  const c = th(dark);
  const rows = useRef(buildExtendRows()).current;
  const [checked, setChecked] = useState<Set<number>>(new Set());
  useEscape(onClose);
  const allowed = rows.filter((r) => !r.locked);
  const allChecked = allowed.length > 0 && allowed.every((r) => checked.has(r.id));
  const selected = allowed.filter((r) => checked.has(r.id));
  const total = selected.reduce((s, r) => s + r.extra * r.qty, 0);
  const toggle = (id: number) => setChecked((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const COLS = "44px 1.2fr 1.3fr 1.3fr 1.6fr 1.3fr 0.6fr 0.8fr";

  return (
    <WinFrame dark={dark} title="Расширение билета" subtitle={`Карта ${card}`} width={1180} height={620} onClose={onClose}>
      <div className="flex items-center justify-between shrink-0" style={{ marginTop: 18 }}>
        <RetCheckbox checked={allChecked} onChange={() => setChecked(allChecked ? new Set() : new Set(allowed.map((r) => r.id)))} label="Выделить все билеты" dark={dark} />
      </div>
      <div className="flex-1 min-h-0 flex flex-col rounded-[10px] overflow-hidden" style={{ marginTop: 14, boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
        <div className="grid items-center shrink-0 text-[13px] font-semibold" style={{ gridTemplateColumns: COLS, height: 42, backgroundColor: c.inputBg, color: c.textSec }}>
          <span />{["Название", "С", "До", "Комментарий", "Расширение", "Кол-во", "Доплата"].map((h) => <span key={h} className="truncate pr-[8px]">{h}</span>)}
        </div>
        <div className={`flex-1 min-h-0 ${RET_SCROLL}`}>
          {rows.map((r) => (
            <div key={r.id} onClick={() => !r.locked && toggle(r.id)}
              className={`grid items-center text-[14px] select-none transition-colors duration-150 ${r.locked ? "cursor-not-allowed" : `cursor-pointer ${dark ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-black/[0.035] active:bg-black/[0.07]"}`}`}
              style={{ gridTemplateColumns: COLS, height: 52, color: c.textPrimary, borderTop: `1px solid ${c.divider}`, opacity: r.locked ? 0.5 : 1,
                backgroundColor: checked.has(r.id) ? (dark ? "#1f4a2a" : "#dffbe6") : undefined, fontFeatureSettings: '"lnum","pnum"' }}>
              <span className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                {r.locked
                  ? <span className="size-[22px] rounded-[5px]" style={{ boxShadow: `inset 0 0 0 1.5px ${c.divider}` }} title={r.comment} />
                  : <RetCheckbox checked={checked.has(r.id)} onChange={() => toggle(r.id)} dark={dark} />}
              </span>
              <span className="truncate pr-[8px] font-semibold">{r.name}</span>
              <span className="truncate pr-[8px]">{r.from}</span>
              <span className="truncate pr-[8px]">{r.to}</span>
              <span className="truncate pr-[8px]" style={{ color: r.locked ? "#F95B1C" : c.textSec }} title={r.comment}>{r.comment}</span>
              <span className="truncate pr-[8px]">{r.ext}</span>
              <span>{r.qty}</span>
              <span>{r.locked ? "—" : `+${r.extra} ₽`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between shrink-0" style={{ marginTop: 20 }}>
        <p className="text-[15px]" style={{ color: c.textSec }}>
          Выбрано: <b style={{ color: c.textPrimary }}>{selected.length}</b> · Доплата: <b style={{ color: c.textPrimary }}>{total} ₽</b>
        </p>
        <div className="flex" style={{ gap: 12 }}>
          <button onClick={() => selected.length > 0 && onConfirm(selected)} className={winGreen(selected.length > 0)} style={{ width: 200 }}>
            OK<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span>
          </button>
          <button onClick={onClose} className={winOutline(dark)} style={{ width: 200, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
            Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
          </button>
        </div>
      </div>
    </WinFrame>
  );
}

// ── Журнал эквайринга ──
interface AcqRow { id: number; date: string; time: string; op: string; rrn: string; card: string; sum: number; canceled?: boolean; }

function buildAcqRows(): AcqRow[] {
  const d = new Date();
  const date = `${adPad(d.getDate())}.${adPad(d.getMonth() + 1)}.${d.getFullYear()}`;
  return [
    { id: 1, date, time: "10:12:05", op: "Оплата", rrn: "628512345671", card: "**** 4421", sum: 1400 },
    { id: 2, date, time: "11:40:37", op: "Оплата", rrn: "628512345702", card: "**** 0187", sum: 800 },
    { id: 3, date, time: "12:05:11", op: "Возврат", rrn: "628512345733", card: "**** 0187", sum: -250 },
    { id: 4, date, time: "14:03:49", op: "Оплата", rrn: "628512345790", card: "**** 9930", sum: 350 },
  ];
}

function AcquiringJournalWindow({ dark, onClose }: { dark: boolean; onClose: () => void }) {
  const c = th(dark);
  const [rows, setRows] = useState<AcqRow[]>(buildAcqRows);
  const [picked, setPicked] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  useEscape(onClose);
  const active = rows.find((r) => String(r.id) === picked) ?? null;
  const canCancel = !!active && active.op === "Оплата" && !active.canceled;

  const cancelOp = () => {
    if (!active || !canCancel) return;
    const now = new Date();
    setRows((prev) => [...prev.map((r) => (r.id === active.id ? { ...r, canceled: true } : r)),
      { id: Math.max(...prev.map((r) => r.id)) + 1, date: active.date, time: `${adPad(now.getHours())}:${adPad(now.getMinutes())}:${adPad(now.getSeconds())}`,
        op: `Отмена${comment.trim() ? ` (${comment.trim()})` : ""}`, rrn: active.rrn, card: active.card, sum: -active.sum }]);
    setComment(""); setPicked(null);
  };

  return (
    <WinFrame dark={dark} title="Журнал эквайринга" width={980} height={680} onClose={onClose}>
      <div className="flex flex-col flex-1 min-h-0" style={{ marginTop: 20 }}>
        <WinTable dark={dark} cols="1fr 0.9fr 1.4fr 1.3fr 1fr 0.8fr" headers={["Дата", "Время", "Операция", "RRN", "Карта", "Сумма"]}
          rows={rows.map((r) => ({ key: String(r.id), cells: [r.date, r.time, r.canceled ? `${r.op} · отменена` : r.op, r.rrn, r.card, `${r.sum} ₽`] }))}
          activeKey={picked} onRowClick={setPicked} empty="Операций за смену нет" />
      </div>
      <div className="flex shrink-0" style={{ gap: 12, marginTop: 16 }}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий" aria-label="Комментарий"
          className={`flex-1 ${winField(dark)}`} style={{ height: 56, backgroundColor: c.inputBg, color: c.textPrimary }} />
        <button onClick={cancelOp} className={winOutline(dark)} disabled={!canCancel}
          style={{ width: 240, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465", opacity: canCancel ? 1 : 0.45, cursor: canCancel ? "pointer" : "default" }}>
          Отменить операцию
        </button>
      </div>
      <div className="flex items-center shrink-0" style={{ gap: 12, marginTop: 16 }}>
        <p className="flex-1 text-[13px]" style={{ color: c.textSec }}>
          {refreshedAt ? `Обновлено в ${refreshedAt}` : active && !canCancel ? "Эту операцию нельзя отменить" : "Выберите оплату, чтобы отменить её"}
        </p>
        <button onClick={() => { const d = new Date(); setRefreshedAt(`${adPad(d.getHours())}:${adPad(d.getMinutes())}:${adPad(d.getSeconds())}`); }}
          className={winOutline(dark)} style={{ width: 180, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>Обновить</button>
        <button onClick={onClose} className={winGreen(true)} style={{ width: 180 }}>Закрыть</button>
      </div>
    </WinFrame>
  );
}

// ── Внесение наличных / Инкассация ──
const fmtMoney = (n: number) => n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CashAmountModal({ dark, kind, onClose, onDone }: { dark: boolean; kind: "deposit" | "collect"; onClose: () => void; onDone: (sum: number) => void }) {
  const c = th(dark);
  const [value, setValue] = useState("");
  useEscape(onClose);
  const sum = Number(value.replace(/\s/g, "").replace(",", ".")) || 0;
  const title = kind === "deposit" ? "Введите сумму для внесения" : "Введите сумму для инкассации";
  const submit = () => { if (sum > 0) onDone(Math.round(sum * 100) / 100); };
  return (
    <WinFrame dark={dark} title={title} width={596} onClose={onClose}>
      <div className="flex items-center rounded-[10px] transition-shadow duration-150 focus-within:shadow-[inset_0_0_0_1.5px_#47d465]"
        style={{ marginTop: 24, height: 64, padding: "0 18px", backgroundColor: c.inputBg }}>
        <input autoFocus inputMode="decimal" value={value} aria-label={title} placeholder="0,00"
          onChange={(e) => setValue(e.target.value.replace(/[^\d,.\s]/g, "").replace(".", ","))}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          className="flex-1 min-w-0 bg-transparent text-right text-[24px] font-bold outline-none placeholder:opacity-35"
          style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }} />
        <span className="text-[22px] font-bold" style={{ color: c.textSec, marginLeft: 8 }}>₽</span>
      </div>
      <div className="flex" style={{ gap: 8, marginTop: 12 }}>
        {[1000, 5000, 10000].map((v) => (
          <button key={v} onClick={() => setValue(String(v))}
            className={`flex-1 h-[40px] rounded-[8px] text-[14px] font-semibold cursor-pointer select-none outline-none transition-all duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#47d465] ${dark ? "hover:bg-white/10 active:bg-white/15" : "hover:bg-black/5 active:bg-black/10"}`}
            style={{ color: c.textPrimary, boxShadow: `inset 0 0 0 1px ${c.divider}` }}>{v.toLocaleString("ru-RU")} ₽</button>
        ))}
      </div>
      <div className="flex" style={{ gap: 14, marginTop: 22 }}>
        <button onClick={submit} className={`${winGreen(sum > 0)} flex-1`}>OK<span className="absolute top-[4px] right-[10px] text-[9px] opacity-70">Enter</span></button>
        <button onClick={onClose} className={`${winOutline(dark)} flex-1`} style={{ color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Отмена<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

// ── Report previews: shown as images, as-is ──
const REPORT_IMAGES: Record<string, string> = {
  "Итоговый отчет по продажам": reportSalesTotal,
  "Сводный отчет по оплатам": reportPaymentsSummary,
  "Детальный по прокату (выдача)": reportRentalDetail,
  "Итоговый по прокату (выдача)": reportRentalTotal,
};

function ReportImageWindow({ dark, title, src, onClose }: { dark: boolean; title: string; src: string; onClose: () => void }) {
  const c = th(dark);
  useEscape(onClose);
  return (
    <WinFrame dark={dark} title={title} width={1300} height={940} onClose={onClose}>
      <div className={`flex-1 min-h-0 rounded-[10px] ${RET_SCROLL}`} style={{ marginTop: 18, backgroundColor: "#e9ebee", boxShadow: `inset 0 0 0 1px ${c.divider}` }}>
        <img src={src} alt={title} className="block w-full h-auto select-none" draggable={false} />
      </div>
      <div className="flex justify-end shrink-0" style={{ marginTop: 18 }}>
        <button onClick={onClose} className={winOutline(dark)} style={{ width: 200, color: c.textPrimary, boxShadow: "inset 0 0 0 1.5px #47d465" }}>
          Закрыть<span className="absolute top-[4px] right-[10px] text-[9px] opacity-50" style={{ color: c.textSec }}>Esc</span>
        </button>
      </div>
    </WinFrame>
  );
}

type PendingAdd = { kind: "add"; product: Product; qty: number } | { kind: "qtyModal"; product: Product };

function PosScreen({ dark, onLogout, requireRegistration }: { dark: boolean; onLogout: () => void; requireRegistration: boolean }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [adminMode, setAdminMode] = useState(false);
  const [showPayment, setShowPayment]         = useState(false);
  const [showPhone, setShowPhone]             = useState(false);
  const [showRegister, setShowRegister]       = useState(false);
  const [registeredPhone, setRegisteredPhone] = useState("");
  const [showCardScan, setShowCardScan]       = useState(false);
  const [showClientInfo, setShowClientInfo]   = useState(false);
  const [qtyProduct, setQtyProduct]           = useState<Product | null>(null);
  const [menuOpen, setMenuOpen]               = useState(false);
  const [showAdmin, setShowAdmin]             = useState(false);
  const [scanFor, setScanFor]                 = useState<"debts" | "returnCard" | "returnCarrier" | "pledgeTake" | "pledgeReturn" | "cardHistory" | "cardExtra" | "service" | "cardUnblock" | "extendTicket" | null>(null);
  const [extraFor, setExtraFor]               = useState<string | null>(null);
  const [servicePick, setServicePick]         = useState(false);
  const [serviceName, setServiceName]         = useState<string | null>(null);
  const [blockSearch, setBlockSearch]         = useState(false);
  const [extraSearch, setExtraSearch]         = useState(false);
  const [blockedCards, setBlockedCards]       = useState<Set<string>>(new Set());
  const [pledges, setPledges]                 = useState<Pledge[]>(seedPledges);
  const [pledgeStep, setPledgeStep]           = useState<{ stage: "type"; card: string } | { stage: "comment"; card: string; type: PledgeType } | null>(null);
  const [showPledgeCells, setShowPledgeCells] = useState(false);
  const [showClientSearch, setShowClientSearch] = useState(false);
  const [historyCard, setHistoryCard]         = useState<string | null>(null);
  const [showPreorders, setShowPreorders]     = useState(false);
  const [tillMenu, setTillMenu]               = useState(false);
  const [showMerge, setShowMerge]             = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [shiftClosed, setShiftClosed]         = useState(false);
  const [reportView, setReportView]           = useState<{ title: string; src: string } | null>(null);
  const [showAcquiring, setShowAcquiring]     = useState(false);
  const [cashKind, setCashKind]               = useState<"deposit" | "collect" | null>(null);
  const [extendCard, setExtendCard]           = useState<string | null>(null);

  // Fake 3-second operation with the spinning Lime logo, then the result.
  const runLoading = (after: () => void) => {
    setLoading(true);
    window.setTimeout(() => { setLoading(false); after(); }, 3000);
  };
  const handleReport = (label: string) => {
    if (REPORT_IMAGES[label]) { setReportView({ title: label, src: REPORT_IMAGES[label] }); return; }
    switch (label) {
      case "Z отчет":
        runLoading(() => { setShiftClosed(true); setNotice({ title: "Z-отчёт напечатан", text: "Смена закрыта. Теперь можно открыть новую смену." }); });
        break;
      case "X отчет":
        runLoading(() => setNotice({ title: "X-отчёт напечатан", text: "Промежуточный отчёт без закрытия смены." }));
        break;
      case "Сверка итогов":
        runLoading(() => setNotice({ title: "Сверка итогов", text: "Отчёт о сверке итогов напечатан на банковском терминале." }));
        break;
      case "Печать":
        runLoading(() => setNotice({ title: "Чек напечатан", text: "Чек реализации услуг за выбранный период отправлен на печать." }));
        break;
      case "Открыть смену":
        setShiftClosed(false);
        setNotice({ title: "Смена открыта", text: "Новая смена открыта, можно продавать." });
        break;
      case "Журнал эквайринга": setShowAcquiring(true); break;
      case "Внесение наличных": setCashKind("deposit"); break;
      case "Инкассация": setCashKind("collect"); break;
    }
  };
  const [returnWin, setReturnWin]             = useState<{ mode: "card"; card: string } | { mode: "check" } | null>(null);
  const [notice, setNotice]                   = useState<{ title: string; text: string; copyValue?: string } | null>(null);
  useEffect(() => { if (!adminMode) setShowAdmin(false); }, [adminMode]);
  const effectiveDark = dark || adminMode;
  const c = th(effectiveDark);

  const [homeMode, setHomeMode]         = useState(false);
  const [gateStage, setGateStage]       = useState<"gate" | "register" | null>(null);
  const [gatePhone, setGatePhone]       = useState("");
  const [pendingAdd, setPendingAdd]     = useState<PendingAdd | null>(null);
  const [currentClient, setCurrentClient] = useState<{ name: string; phone: string } | null>(null);
  const [guests, setGuests]             = useState<GuestEntry[]>([]);
  const [pickerRequest, setPickerRequest] = useState<{ product: Product; qty: number } | null>(null);

  // With "Обязательная регистрация" on, prompt for the client right away when
  // the till opens (after "Сохранить" on the settings screen) instead of
  // waiting for the first product click.
  useEffect(() => {
    if (requireRegistration && !currentClient && !homeMode) setGateStage("gate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (p: Product, qty: number = 1, guestName?: string) =>
    setCartItems((prev) => [...prev, ...Array.from({ length: qty }, () => ({ id: nextCartId++, productId: p.id, name: p.name, price: p.price, guestName }))]);
  const clearCart     = () => setCartItems([]);
  const deleteItem    = (id: number) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  // If more than one person (primary client + guests checked "для текущего
  // посещения") is on the visit, ask which one the product is for.
  const resolveAdd = (product: Product, qty: number) => {
    const selected = guests.filter((g) => g.selectedForVisit);
    if (selected.length > 0) setPickerRequest({ product, qty });
    else addToCart(product, qty);
  };

  const handleProductClick = (product: Product) => {
    if (requireRegistration && !currentClient) {
      setHomeMode(false);
      setPendingAdd({ kind: "add", product, qty: 1 });
      setGateStage("gate");
      return;
    }
    resolveAdd(product, 1);
  };

  const handleLongPressAdd = (product: Product) => {
    if (requireRegistration && !currentClient) {
      setHomeMode(false);
      setPendingAdd({ kind: "qtyModal", product });
      setGateStage("gate");
      return;
    }
    setQtyProduct(product);
  };

  const handleAction = (a: MenuAction) => {
    setMenuOpen(false);
    if (a === "returnCheck") setReturnWin({ mode: "check" });
    else if (a === "pledgeCells") setShowPledgeCells(true);
    else if (a === "clientSearch") setShowClientSearch(true);
    else if (a === "preorders") setShowPreorders(true);
    else if (a === "cardExtraSearch") setExtraSearch(true);
    else if (a === "service") setServicePick(true);
    else if (a === "cardBlock") setBlockSearch(true);
    else if (a === "mergeAccounts") setShowMerge(true);
    else if (a === "cardExtra") { setExtraFor(null); setScanFor("cardExtra"); }
    else setScanFor(a);
  };

  const handleScanned = (card: string) => {
    const purpose = scanFor;
    setScanFor(null);
    if (purpose === "debts") {
      const debts = debtsForCard(card);
      if (debts.length === 0) { setNotice({ title: "Долгов нет", text: "На этой карте нет задолженностей.", copyValue: card }); return; }
      setCartItems((prev) => [...prev, ...debts.map((d) => ({ id: nextCartId++, productId: 0, name: d.name, price: d.price, kind: "debt" as const, card }))]);
    } else if (purpose === "returnCard") {
      if (!cardHasData(card)) { setNotice({ title: "Нет товаров к возврату", text: "На этой карте нет товаров, доступных к возврату.", copyValue: card }); return; }
      setReturnWin({ mode: "card", card });
    } else if (purpose === "returnCarrier") {
      if (!cardHasData(card)) { setNotice({ title: "Ошибка", text: "Данная карта не найдена в списке доступных к возврату товаров", copyValue: card }); return; }
      if (cartItems.some((i) => i.kind === "return-carrier" && i.card === card)) { setNotice({ title: "Карта уже добавлена", text: "Эта карта уже есть в списке к возврату.", copyValue: card }); return; }
      setCartItems((prev) => [...prev, { id: nextCartId++, productId: 0, name: `Возврат носителя ${card}`, price: -100, kind: "return-carrier" as const, card }]);
    } else if (purpose === "pledgeTake") {
      const existing = pledges.find((p) => !p.returnedAt && p.card === card);
      if (existing) { setNotice({ title: "Залог уже взят", text: `По этой карте залог уже лежит в ячейке номер: ${existing.cell} (${existing.type}).`, copyValue: card }); return; }
      setPledgeStep({ stage: "type", card });
    } else if (purpose === "pledgeReturn") {
      const existing = pledges.find((p) => !p.returnedAt && p.card === card);
      if (!existing) { setNotice({ title: "Залог не найден", text: "По этой карте нет залога в ячейках.", copyValue: card }); return; }
      setPledges((prev) => prev.map((p) => (p === existing ? { ...p, returnedAt: new Date() } : p)));
      setNotice({ title: `Верните залог из ячейки номер: ${existing.cell}`, text: `Тип залога: ${existing.type}${existing.comment ? `. Комментарий: ${existing.comment}` : ""}` });
    } else if (purpose === "cardHistory") {
      setHistoryCard(card);
    } else if (purpose === "cardExtra") {
      const owner = extraFor;
      setExtraFor(null);
      if (!cardHasData(card) || blockedCards.has(card)) {
        setNotice({ title: "Нет возможности выдать карту", text: blockedCards.has(card) ? "Карта заблокирована и не может быть выдана." : "Карта уже привязана к другому клиенту или неисправна.", copyValue: card });
        return;
      }
      setNotice({ title: "Карта привязана успешно", text: owner ? `Дополнительная карта привязана к клиенту ${owner}.` : "Дополнительная карта привязана к счёту клиента.", copyValue: card });
    } else if (purpose === "service") {
      const svc = TILL_SERVICES.find((x) => x.name === serviceName);
      setServiceName(null);
      if (!svc) return;
      if (blockedCards.has(card)) { setNotice({ title: "Проход запрещён", text: "Карта заблокирована.", copyValue: card }); return; }
      if (!cardHasData(card)) { setNotice({ title: "Проход запрещён", text: `Недостаточно средств на карте для услуги «${svc.name}».`, copyValue: card }); return; }
      setNotice({ title: "Проход разрешён", text: `Услуга: ${svc.name}. Списано за проход: ${svc.price} ₽. Остаток на карте: ${1400 - svc.price} ₽.` });
    } else if (purpose === "extendTicket") {
      if (!cardHasData(card)) { setNotice({ title: "Нет билетов для расширения", text: "На этой карте нет билетов, которые можно расширить.", copyValue: card }); return; }
      setExtendCard(card);
    } else if (purpose === "cardUnblock") {
      if (!blockedCards.has(card)) { setNotice({ title: "Карта не заблокирована", text: "Эта карта активна, разблокировка не требуется.", copyValue: card }); return; }
      setBlockedCards((prev) => { const n = new Set(prev); n.delete(card); return n; });
      setNotice({ title: "Карта разблокирована", text: "Карту снова можно использовать.", copyValue: card });
    }
  };

  const finishPledge = (card: string, type: PledgeType, comment: string) => {
    const cell = firstFreeCell(pledges);
    setPledges((prev) => [...prev, { cell, type, card, comment, place: PLEDGE_PLACES[0], takenAt: new Date(), returnedAt: null }]);
    setPledgeStep(null);
    setNotice({ title: `Положите залог в ячейку номер: ${cell}`, text: `Тип залога: ${type}${comment ? `. Комментарий: ${comment}` : ""}` });
  };

  return (
    <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <LeftSidebar dark={effectiveDark} adminMode={adminMode} onLogout={onLogout} onUserPlus={() => setShowPhone(true)}
        onMenu={() => { setTillMenu(false); setMenuOpen((v) => !v); }}
        onHome={requireRegistration ? () => setHomeMode((v) => !v) : undefined}
        homeActive={homeMode}
        onShield={() => { setMenuOpen(false); setShowAdmin(true); }}
        onSettings={() => { setMenuOpen(false); setTillMenu((v) => !v); }}
        settingsOpen={tillMenu}
      />
      <TopBar dark={effectiveDark} adminMode={adminMode} onAdminToggle={() => setAdminMode((m) => !m)}
        activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {menuOpen && (
        <SidebarMenu dark={effectiveDark} onClose={() => setMenuOpen(false)}
          onClientInfo={() => { setShowCardScan(true); setMenuOpen(false); }}
          onAction={handleAction} />
      )}

      <ProductGrid dark={effectiveDark} onAdd={handleProductClick} onLongPressAdd={handleLongPressAdd} />
      <BottomBar dark={effectiveDark} onClientInfo={() => setShowCardScan(true)} onAction={handleAction} />

      {showMerge && (
        <MergeAccountsWindow dark={effectiveDark} onClose={() => setShowMerge(false)}
          onMerged={(l, r) => { setShowMerge(false); setNotice({ title: "Счета объединены", text: `Счёт клиента ${r.name} присоединён к счёту ${l.name}.` }); }} />
      )}
      {extendCard && (
        <ExtendTicketWindow dark={effectiveDark} card={extendCard} onClose={() => setExtendCard(null)}
          onConfirm={(rows) => {
            setExtendCard(null);
            setCartItems((prev) => [...prev, ...rows.flatMap((r) => Array.from({ length: r.qty }, () => ({ id: nextCartId++, productId: 0, name: `Расширение: ${r.name} → ${r.ext}`, price: r.extra, card: extendCard })))]);
          }} />
      )}
      {showAcquiring && <AcquiringJournalWindow dark={effectiveDark} onClose={() => setShowAcquiring(false)} />}
      {cashKind && (
        <CashAmountModal dark={effectiveDark} kind={cashKind} onClose={() => setCashKind(null)}
          onDone={(sum) => { const k = cashKind; setCashKind(null); setNotice({ title: k === "deposit" ? "Внесение выполнено" : "Инкассация выполнена", text: `Сумма: ${fmtMoney(sum)} ₽` }); }} />
      )}
      {reportView && <ReportImageWindow dark={effectiveDark} title={reportView.title} src={reportView.src} onClose={() => setReportView(null)} />}
      {loading && <LoadingOverlay dark={effectiveDark} />}
      {tillMenu && (
        <TillActionsFlyout dark={effectiveDark} adminMode={adminMode} canOpenShift={shiftClosed} onClose={() => setTillMenu(false)}
          onAction={(a) => { setTillMenu(false); if (a.label === "Сверка итогов" || a.label === "Открыть смену") handleReport(a.label); else setNotice({ title: a.title, text: a.text }); }} />
      )}
      {showPreorders && (
        <PreorderScreen dark={effectiveDark} onClose={() => setShowPreorders(false)}
          onAddToSale={(items) => setCartItems((prev) => [...prev, ...items.flatMap((i) => Array.from({ length: i.qty }, () => ({ id: nextCartId++, productId: 0, name: i.name, price: i.price })))])} />
      )}
      {showAdmin && adminMode && (
        <AdminScreen onClose={() => setShowAdmin(false)} onClientInfo={() => setShowCardScan(true)} onReport={handleReport} canOpenShift={shiftClosed} />
      )}

      {qtyProduct && (
        <QuantityModal
          product={qtyProduct}
          dark={effectiveDark}
          onConfirm={(qty) => { resolveAdd(qtyProduct, qty); setQtyProduct(null); }}
          onCancel={() => setQtyProduct(null)}
        />
      )}
      <ReceiptPanel
        dark={effectiveDark}
        adminMode={adminMode}
        cartItems={cartItems}
        onClear={clearCart}
        onDeleteItem={deleteItem}
        onCheckout={() => cartItems.length > 0 && setShowPayment(true)}
        onRefund={clearCart}
        client={currentClient}
        onEditClient={currentClient ? () => setGateStage("register") : undefined}
      />

      {pickerRequest && (
        <GuestPickerModal
          productName={pickerRequest.product.name}
          people={[
            { id: "primary", name: currentClient?.name || "Клиент", isPrimary: true },
            ...guests.filter((g) => g.selectedForVisit).map((g) => ({ id: String(g.id), name: g.name || "Гость", isPrimary: false })),
          ]}
          onPick={(person) => { addToCart(pickerRequest.product, pickerRequest.qty, person.isPrimary ? undefined : person.name); setPickerRequest(null); }}
          onCancel={() => setPickerRequest(null)}
        />
      )}

      {showPayment && (
        <PaymentModal
          cartTotal={cartTotal}
          dark={effectiveDark}
          onConfirm={() => { clearCart(); setCurrentClient(null); setGuests([]); setShowPayment(false); }}
          onCancel={() => setShowPayment(false)}
        />
      )}
      {showPhone && (
        <ClientIdentifyModal
          dark={effectiveDark}
          onClose={() => setShowPhone(false)}
          onPhone={(phone) => {
            setShowPhone(false);
            setRegisteredPhone(phone);
            setShowRegister(true);
          }}
          onCard={(uid) => {
            setShowPhone(false);
            const found = SAMPLE_CLIENTS.find((cl) => cl.uid === uid);
            setCurrentClient({ name: found?.name ?? "Гость по карте", phone: found ? found.phone : `UID ${uid}` });
            setGuests([]);
          }}
        />
      )}
      {showRegister && (
        <RegistrationScreen
          phone={registeredPhone}
          onCancel={() => setShowRegister(false)}
          onSave={() => setShowRegister(false)}
          onSaveAndPurchase={() => setShowRegister(false)}
        />
      )}
      {showCardScan && (
        <CardScanModal
          onClose={() => setShowCardScan(false)}
          onSuccess={() => { setShowCardScan(false); setShowClientInfo(true); }}
        />
      )}
      {showClientInfo && (
        <ClientInfoScreen onClose={() => setShowClientInfo(false)} />
      )}
      {scanFor && (
        <CardScanModal
          title={({ debts: "Считайте карту для гашения долгов", returnCarrier: "Считайте карту для возврата носителя", returnCard: "Считайте карту для возврата", pledgeTake: "Считайте карту для залога", pledgeReturn: "Считайте карту для возврата залога", cardHistory: "Считайте карту", cardExtra: "Считайте дополнительную карту", service: "Считайте карту для прохода", cardUnblock: "Считайте карту для разблокировки", extendTicket: "Считайте карту для расширения билета" } as const)[scanFor]}
          onClose={() => setScanFor(null)}
          onSuccess={handleScanned}
        />
      )}
      {returnWin && (
        <ReturnWindow
          mode={returnWin.mode} card={returnWin.mode === "card" ? returnWin.card : undefined} dark={effectiveDark}
          onClose={() => setReturnWin(null)}
          onDone={({ count, sum }) => { setReturnWin(null); setNotice({ title: "Возврат выполнен", text: `Позиций: ${count}. Сумма к возврату: ${sum} ₽.` }); }}
        />
      )}
      {pledgeStep?.stage === "type" && (
        <PledgeTypeModal dark={effectiveDark} card={pledgeStep.card}
          onPick={(type) => setPledgeStep({ stage: "comment", card: pledgeStep.card, type })}
          onCancel={() => setPledgeStep(null)} />
      )}
      {pledgeStep?.stage === "comment" && (
        <PledgeCommentModal dark={effectiveDark} type={pledgeStep.type}
          onOk={(comment) => finishPledge(pledgeStep.card, pledgeStep.type, comment)}
          onCancel={() => setPledgeStep(null)} />
      )}
      {showPledgeCells && <PledgeCellsWindow dark={effectiveDark} pledges={pledges} onClose={() => setShowPledgeCells(false)} />}
      {showClientSearch && (
        <ClientSearchWindow dark={effectiveDark} onClose={() => setShowClientSearch(false)}
          onOk={() => { setShowClientSearch(false); setShowClientInfo(true); }} />
      )}
      {extraSearch && (
        <ClientSearchWindow dark={effectiveDark} title="Доп. карта с поиском" onClose={() => setExtraSearch(false)}
          onOk={(client) => { setExtraSearch(false); setExtraFor(client.name); setScanFor("cardExtra"); }} />
      )}
      {blockSearch && (
        <ClientSearchWindow dark={effectiveDark} title="Блокировать" withBlock onClose={() => setBlockSearch(false)}
          onOk={(client, block) => {
            setBlockSearch(false);
            setBlockedCards((prev) => new Set(prev).add(client.uid));
            const tail = block?.action === "Замена" ? " Выдайте клиенту новую карту." : block?.action === "Блокировка с изъятием" ? " Изымите карту у клиента." : " Карту можно будет разблокировать позже.";
            setNotice({ title: "Карта заблокирована", text: `${client.name}. Причина: ${block?.reason}. Действие: ${block?.action}.${tail}`, copyValue: client.uid });
          }} />
      )}
      {servicePick && (
        <ChoiceModal dark={effectiveDark} title="Выберите услугу" subtitle="Оказание услуги" options={TILL_SERVICES.map((x) => x.name)}
          onPick={(name) => { setServicePick(false); setServiceName(name); setScanFor("service"); }}
          onCancel={() => setServicePick(false)} />
      )}
      {historyCard && <CardHistoryWindow dark={effectiveDark} card={historyCard} onClose={() => setHistoryCard(null)} />}
      {notice && <NoticeModal dark={effectiveDark} {...notice} onClose={() => setNotice(null)} />}

      {/* Mandatory-registration gate screens — hidden (not unmounted, so any
          in-progress typing survives) while the side menu is open; per spec,
          opening the menu closes the registration window and it resumes once
          the menu closes. */}
      {gateStage === "gate" && (
        <div style={{ display: menuOpen ? "none" : undefined }}>
          <AuthGateModal
            onClose={() => { setGateStage(null); setPendingAdd(null); }}
            onPhoneSuccess={(phone) => { setGatePhone(phone); setGateStage("register"); }}
            onCardSuccess={() => {
              setCurrentClient({ name: "Гость по карте", phone: "" });
              setGuests([]);
              setGateStage(null);
              if (pendingAdd) {
                const pa = pendingAdd;
                setPendingAdd(null);
                if (pa.kind === "qtyModal") setQtyProduct(pa.product);
                else addToCart(pa.product, pa.qty);
              }
            }}
          />
        </div>
      )}
      {gateStage === "register" && (
        <div style={{ display: menuOpen ? "none" : undefined }}>
          <RegistrationScreen
            phone={currentClient?.phone || gatePhone}
            onCancel={() => { setGateStage(null); setPendingAdd(null); }}
            onSave={() => setGateStage(null)}
            onSaveAndPurchase={(info) => {
              setCurrentClient({ name: info.name, phone: info.phone });
              setGuests(info.guests);
              setGateStage(null);
              if (pendingAdd) {
                const pa = pendingAdd;
                setPendingAdd(null);
                const selected = info.guests.filter((g) => g.selectedForVisit);
                if (pa.kind === "qtyModal") setQtyProduct(pa.product);
                else if (selected.length > 0) setPickerRequest({ product: pa.product, qty: pa.qty });
                else addToCart(pa.product, pa.qty);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  // Scaled uniformly to FIT inside the browser window (never crops or hides
  // any part of the UI) and centered, so any leftover space is an even margin
  // on all sides instead of content bleeding off-screen or being stretched
  // past its natural size on windows that aren't shaped like 1440×1024.
  //
  // The outer wrapper is sized from these same tracked pixel values instead
  // of vw/vh (w-screen/h-screen): on some mobile browsers and devtools device
  // emulation, 100vw/100vh can disagree with documentElement's own
  // clientWidth/clientHeight, which desynced the centering math from the
  // scale — content rendered at the right size but shifted off-screen.
  // Keeping one source of truth for both eliminates that mismatch.
  const [viewport, setViewport] = useState({ w: 1440, h: 1024 });
  const scale = Math.min(viewport.w / 1440, viewport.h / 1024);
  const [screen, setScreen] = useState<Screen>("login-password");
  // Replaces the old manual dark-theme toggle: it no longer changes any screen's
  // colors by itself (dark mode is now only reachable via "Режим администратора"
  // on the till), it gates whether a customer must be authorized before a
  // product can be added on the POS screen.
  const [requireRegistration, setRequireRegistration] = useState(false);

  useLayoutEffect(() => {
    const compute = () => {
      const el = document.documentElement;
      setViewport({ w: el.clientWidth, h: el.clientHeight });
    };
    compute();
    // ResizeObserver instead of relying solely on the window "resize" event:
    // some viewport changes (devtools/device emulation, some OS-level zoom or
    // display changes) don't reliably fire a "resize" event, which left the
    // canvas scaled for the previous size until something else happened to
    // trigger a recompute. Observing <html> catches every actual size change.
    const ro = new ResizeObserver(compute);
    ro.observe(document.documentElement);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, []);

  return (
    <div className="overflow-hidden" style={{ width: viewport.w, height: viewport.h, fontFamily: "Raleway, sans-serif", backgroundColor: th(false).screenBg }}>
      <div style={{ width: 1440, height: 1024, transform: `translate(-50%, -50%) scale(${scale})`, position: "absolute", top: "50%", left: "50%" }}>
        {screen === "login-password" && (
          <LoginPasswordScreen dark={false} onLogin={() => setScreen("select-installation")} onSwitchToPin={() => setScreen("login-pin")} />
        )}
        {screen === "login-pin" && (
          <LoginPinScreen dark={false} onLogin={() => setScreen("pos")} onSwitchToPassword={() => setScreen("login-password")} />
        )}
        {screen === "select-installation" && (
          <SelectInstallationScreen dark={false} onOk={() => setScreen("settings")} onCancel={() => setScreen("login-password")} />
        )}
        {screen === "settings" && (
          <SettingsScreen dark={false} requireRegistration={requireRegistration}
            onToggleRequireRegistration={() => setRequireRegistration((v) => !v)}
            onSave={() => setScreen("pos")} onBack={() => setScreen("select-installation")} />
        )}
        {screen === "pos" && (
          <PosScreen dark={false} requireRegistration={requireRegistration} onLogout={() => setScreen("login-password")} />
        )}
      </div>
    </div>
  );
}
