import { useState, useLayoutEffect, useRef, useEffect } from "react";
import svgPos from "@/imports/КассаАдминистраторВыкл/svg-4602a92fxm";
import svgPosOn from "@/imports/1/svg-tnh89gkkjt";
import svgPathsPin from "@/imports/ВходВСистемуПоПинКоду/svg-m47bpoicig";
import svgPathsSettings from "@/imports/ОкноНастроек/svg-07zwmi8g09";
import svgPayment from "@/imports/Расчет1/svg-s1m9q89cq0";
import svgClose from "@/imports/Group/svg-5zdpobxose";
import svgVvod from "@/imports/ВводНомера/svg-jthakxpxua";
import svgNomer from "@/imports/НомерПринят/svg-4g1idpx879";
import svgReg from "@/imports/РегистрацияГостя-1/svg-2ne1v20uh3";
import svgNewData from "@/imports/НовыеДанные/svg-49bwdoakjj";
import svgCard from "@/imports/СчитатьКарту/svg-lwbgswx1qv";
import svgClientInfo from "@/imports/СРегистрацией/svg-3jfmc2efvu";
import imgQR from "@/imports/1/4d69aa6756d179e7616a13220d1be3c3fedfc37a.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "login-password" | "login-pin" | "select-installation" | "settings" | "pos";

interface CartItem { id: number; productId: number; name: string; price: number; }
interface Product  { id: number; name: string; price: number; bg: string; }

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

function IconUserPlus() {
  return (
    <svg fill="none" viewBox="0 0 24 24" className="size-6">
      <path d={svgPos.p3f80dc40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPos.p1280af80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 8V14"  stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M23 11H17" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

function DarkToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-4 cursor-pointer select-none"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <div
        className="relative shrink-0 transition-colors duration-200"
        style={{ width: 40.6, height: 24, borderRadius: 17.5, backgroundColor: dark ? "#47d465" : "#a4a4a4" }}
      >
        <div
          className="absolute transition-all duration-200"
          style={{
            top: "11.54%", bottom: "11.54%", width: "45.36%",
            borderRadius: "50%", backgroundColor: "white",
            left: dark ? "47.73%" : "8.9%",
          }}
        />
      </div>
      <span className="text-[16px] font-normal whitespace-nowrap" style={{ color: dark ? "#ffffff" : "#252422" }}>
        Темная тема
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

function SettingsScreen({ dark, onDarkToggle, onSave, onBack }: {
  dark: boolean; onDarkToggle: () => void; onSave: () => void; onBack: () => void;
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
          <DarkToggle dark={dark} onToggle={onDarkToggle} />
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

function LeftSidebar({ dark, adminMode, onLogout, onUserPlus }: { dark: boolean; adminMode: boolean; onLogout: () => void; onUserPlus: () => void }) {
  const c = th(dark);
  const ic = dark ? "#ffffff" : "black";
  const iconBtn = "flex items-center justify-center cursor-pointer transition-all duration-150 hover:opacity-70 active:opacity-50 active:scale-[0.93] select-none";
  return (
    <div className="absolute left-px top-0 w-[72px] h-[1024px] overflow-clip transition-colors duration-300" style={{ backgroundColor: c.sidebarBg }}>
      {/* Logo — matches Figma: inset-[1.46% 29.4% 95.64% 29.17%] of 72×1024 */}
      <div className="absolute" style={{ left: 21, top: 15 }}><IconLogo /></div>

      {/* User+ button */}
      <button
        onClick={onUserPlus}
        className={`absolute left-[11px] top-[82px] w-[50px] h-[48px] rounded-[10px] flex items-center justify-center ${iconBtn}`}
        style={{ backgroundColor: "#2b2b2b" }}
      >
        <IconUserPlus />
      </button>

      {/* Bottom icon cluster: shield (admin only), settings, message, logout */}
      <div className="absolute flex flex-col gap-[29px]" style={{ left: 24, top: adminMode ? 809 : 838 }}>
        {adminMode && (
          <div className={iconBtn}><IconShield /></div>
        )}
        <div className={iconBtn}><IconSettingsGear color={ic} /></div>
        <div className={iconBtn}><IconMessage color={ic} /></div>
        <button onClick={onLogout} className={iconBtn}><IconLogout color={ic} /></button>
      </div>
    </div>
  );
}

// Category tab definitions matching Figma exactly
const CATS = [
  { id: "all",   label: "Все товары",          left: 115, width: 127 },
  { id: "adult", label: "Взрослые билеты",      left: 264, width: 162 },
  { id: "child", label: "Детские билеты",       left: 448, width: 151 },
  { id: "other", label: "Еще какие-то билеты",  left: 621, width: 195 },
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

function ProductCard({ product, dark, onClick }: { product: Product; dark: boolean; onClick: (p: Product) => void }) {
  const bg = dark && product.bg === "#ffffff" ? th(dark).productCard : product.bg;
  const textColor = dark ? "#f0f0f0" : "#2b2b2b";
  return (
    <div onClick={() => onClick(product)}
      className="relative h-[146px] w-[227px] rounded-[10px] overflow-hidden cursor-pointer select-none transition-all duration-150 hover:scale-[1.025] hover:shadow-md active:scale-[0.97] active:shadow-sm"
      style={{ backgroundColor: bg }}>
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "19px 15px 21px 12px" }}>
        <p className="text-[18px] font-semibold leading-[1.25] w-[200px]" style={{ color: textColor }}>{product.name}</p>
        <p className="text-[18px] font-extrabold leading-[1.25]" style={{ color: textColor, fontFeatureSettings: '"lnum","pnum"' }}>
          {product.price} ₽
        </p>
      </div>
    </div>
  );
}

function ProductGrid({ dark, onAdd }: { dark: boolean; onAdd: (p: Product) => void }) {
  const rows  = [PRODUCTS.slice(0,4), PRODUCTS.slice(4,8), PRODUCTS.slice(8,12)];
  const tops  = [223, 397, 571];
  const lefts = [115, 358, 601, 844];
  return (
    <>
      <div className="absolute text-[16px] font-normal" style={{ left: 115, top: 187, color: th(dark).textSec }}>Частые действия</div>
      {rows.map((row, ri) =>
        row.map((p, ci) => (
          <div key={p.id} className="absolute" style={{ top: tops[ri], left: lefts[ci] }}>
            <ProductCard product={p} dark={dark} onClick={onAdd} />
          </div>
        ))
      )}
    </>
  );
}

function ReceiptPanel({ dark, cartItems, onClear, onDelete, onAdd, onCheckout }: {
  dark: boolean; cartItems: CartItem[]; onClear: () => void; onDelete: () => void; onAdd: () => void; onCheckout: () => void;
}) {
  const hasItems = cartItems.length > 0;
  const total = cartItems.reduce((s, i) => s + i.price, 0);
  const c = th(dark);
  const darkBtn = "flex items-center justify-center text-white text-[14px] font-semibold rounded-[10px] bg-[#303030] transition-all duration-150 hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98] select-none";

  return (
    <div className="absolute left-[1114px] top-0 w-[326px] h-[1024px]">
      <div className="absolute inset-0 rounded-[10px] transition-colors duration-300"
        style={{ backgroundColor: c.sidebarBg, border: `1px solid ${dark ? c.divider : "#f9f9f9"}` }} />

      {/* Title row — top-30 when empty, top-50 when has items (per Figma) */}
      <div className="absolute flex items-center whitespace-nowrap" style={{ left: hasItems ? 18 : 16, top: hasItems ? 50 : 30, gap: 55 }}>
        <p className="text-[24px] font-bold tracking-[0.3px]" style={{ color: c.textPrimary }}>Продажа</p>
        <button onClick={hasItems ? onClear : undefined}
          className="text-[14px] font-normal underline underline-offset-2 transition-opacity duration-150"
          style={{ color: c.textSec, opacity: hasItems ? 0.5 : 0.25, cursor: hasItems ? "pointer" : "default" }}
          onMouseEnter={(e) => hasItems && ((e.target as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => hasItems && ((e.target as HTMLElement).style.opacity = "0.5")}>
          Очистить чек
        </button>
      </div>

      {hasItems && (
        <>
          <p className="absolute left-[22px] top-[91px] text-[14px] font-normal opacity-50 w-[224px] leading-[1.1]"
            style={{ color: c.textSec, fontFeatureSettings: '"lnum","pnum"' }}>
            Чек открыт 26.03.26 в 13:27
          </p>
          {/* Cart items at top-127 */}
          <div className="absolute left-[18px] top-[127px] w-[259px] flex flex-col">
            {cartItems.map((item, idx) => {
              const isLast = idx === cartItems.length - 1;
              return (
                <div key={item.id}>
                  <div className="relative w-full h-[70px] p-[8px]" style={{ backgroundColor: isLast ? (dark ? "#1a3d22" : "#d2f4d9") : "transparent" }}>
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-[14px] font-normal opacity-50 leading-[1.1] w-[224px]"
                        style={{ color: c.textSec, fontFeatureSettings: '"lnum","pnum"' }}>
                        Тип билета: Детский 1 круг
                      </p>
                      <p className="text-[16px] font-extrabold leading-[1.25]"
                        style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>
                        {item.price} ₽
                      </p>
                    </div>
                    <img src={imgQR} alt="QR" className="absolute right-[8px] top-[30px] size-[32px] object-cover" />
                  </div>
                  {!isLast && <div className="w-full h-px" style={{ backgroundColor: c.divider }} />}
                </div>
              );
            })}
          </div>

          {/* ПОЗИЦИИ + ИТОГО */}
          <div className="absolute flex items-center justify-between"
            style={{ left: 34, top: 766, width: 259 }}>
            <span className="text-[14px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>ПОЗИЦИИ:</span>
            <span className="text-[16px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>{cartItems.length}</span>
          </div>
          <div className="absolute flex items-center justify-between"
            style={{ left: 35, top: 812, width: 258 }}>
            <span className="text-[14px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>ИТОГО:</span>
            <span className="text-[16px] font-extrabold" style={{ color: c.textPrimary, fontFeatureSettings: '"lnum","pnum"' }}>{total} ₽</span>
          </div>
        </>
      )}

      {/* Удалить / Добавить — opacity-58 when empty (per Figma) */}
      <div className="absolute flex gap-[11px]" style={{ left: 34, top: 841, opacity: hasItems ? 1 : 0.58 }}>
        <div onClick={hasItems ? onDelete : undefined}
          className={`${darkBtn} w-[123px] h-[46px]`} style={{ cursor: hasItems ? "pointer" : "default" }}>Удалить</div>
        <div onClick={hasItems ? onAdd : undefined}
          className={`${darkBtn} w-[123px] h-[46px]`} style={{ cursor: hasItems ? "pointer" : "default" }}>Добавить</div>
      </div>

      {/* Скидка % — left-34 top-898 (1148-1114=34) */}
      <div
        className={`absolute flex items-center justify-center gap-[10px] rounded-[10px] select-none bg-[#303030] transition-all duration-150 ${hasItems ? "cursor-pointer hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98]" : "cursor-default"}`}
        style={{ left: 34, top: 898, width: 257, height: 46, opacity: hasItems ? 1 : 0.58 }}>
        <span className="text-[14px] font-semibold text-white">Скидка</span>
        <IconPercent />
      </div>

      {/* Расчет — left-34 top-955 */}
      <button
        onClick={hasItems ? onCheckout : undefined}
        className={`absolute rounded-[10px] text-[14px] font-black text-white bg-[#47d465] transition-all duration-150 select-none ${hasItems ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]" : "cursor-default"}`}
        style={{ left: 34, top: 955, width: 258, height: 52, opacity: hasItems ? 1 : 0.58 }}>
        Расчет
      </button>
    </div>
  );
}

function BottomBar({ dark, onClientInfo }: { dark: boolean; onClientInfo?: () => void }) {
  const c = th(dark);
  const darkBtn = "absolute flex items-center justify-center text-[14px] font-semibold text-white rounded-[10px] bg-[#303030] cursor-pointer transition-all duration-150 hover:bg-[#404040] active:bg-[#1a1a1a] active:scale-[0.98] select-none";

  // Мониторы and Меню: white bg, positioned at top-886
  const outlineBtn = "absolute h-[46px] rounded-[10px] flex items-center justify-center gap-[10px] bg-white cursor-pointer transition-all duration-150 hover:shadow-md active:shadow-sm active:scale-[0.98] select-none drop-shadow-[0px_4px_8.75px_rgba(174,174,177,0.25)]";

  return (
    <>
      {/* Мониторы — left-82 top-886 w-141 */}
      <div className={outlineBtn} style={{ left: 82, top: 886, width: 141 }}>
        <span className="text-[16px] font-normal text-[#252422]" style={{ fontFeatureSettings: '"lnum","pnum"' }}>Мониторы</span>
        <div className="-scale-y-100"><IconAngleRight color="#303030" /></div>
      </div>

      {/* Меню — left-993 top-886 w-106 */}
      <div className={outlineBtn} style={{ left: 993, top: 886, width: 106 }}>
        <div className="rotate-180"><IconAngleRight color="#303030" /></div>
        <span className="text-[16px] font-normal text-[#252422]" style={{ fontFeatureSettings: '"lnum","pnum"' }}>Меню</span>
      </div>

      {/* White bottom bar container — left-82 top-944 w-1023 h-80 */}
      <div className="absolute left-[82px] top-[944px] w-[1023px] h-[80px] rounded-[10px] transition-colors duration-300"
        style={{ backgroundColor: c.bottomBarBg }} />

      {/* Action buttons at top-961, exact Figma positions */}
      <div className={`${darkBtn} left-[88px] top-[961px] w-[164px] h-[46px]`}>
        Возврат по карте
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">Backspace</span>
      </div>
      <div className={`${darkBtn} left-[264px] top-[961px] w-[140px] h-[46px]`}>
        Возврат по чеку
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">Alt=Backspace</span>
      </div>
      <div className={`${darkBtn} left-[416px] top-[961px] w-[142px] h-[46px]`}>
        Возврат по чеку
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">Alt=Backspace</span>
      </div>
      <div className={`${darkBtn} left-[570px] top-[961px] w-[141px] h-[46px]`}>
        Гашение долгов
        <span className="absolute top-[2px] right-[8px] text-[6px] text-[#f5f5f5]">F8</span>
      </div>
      <div className={`${darkBtn} left-[723px] top-[961px] w-[177px] h-[46px]`}>Печать последних QR</div>
      <button onClick={onClientInfo} className={`${darkBtn} left-[912px] top-[961px] w-[188px] h-[46px]`}>Инфо о клиенте по карте</button>
    </>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

type ProcessingKey = "cash" | "card" | "bonus";

const PROCESSING_OPTIONS: { key: ProcessingKey; label: string }[] = [
  { key: "cash",  label: "Наличные" },
  { key: "card",  label: "Безналичные" },
  { key: "bonus", label: "Бонусы" },
];

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

function IconBonus({ selected }: { selected: boolean }) {
  const c2 = selected ? "white" : "#252422";
  return (
    <svg fill="none" viewBox="0 0 15 16" className="w-[15px] h-[16px]">
      <path clipRule="evenodd" d={svgPayment.p16e7000} fill="#A3CB72" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPayment.p1949ba00} fill={c2} fillRule="evenodd" />
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
function IconModalClose() {
  return (
    <div style={{ width: 32.345, height: 41.377, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-51.98deg) scaleY(0.97) skewX(-13.97deg)" }}>
        <svg fill="none" viewBox="0 0 26.26 26.26" style={{ width: 26.259, height: 26.259 }}>
          <path d={svgClose.p2deb47f0} fill="#303030" />
        </svg>
      </div>
    </div>
  );
}

function PaymentModal({ cartTotal, onConfirm, onCancel }: {
  cartTotal: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  // rows = processings added to "Продажи"; activeKey = the one whose button is green
  const [rows, setRows] = useState<ProcessingKey[]>([]);
  const [activeKey, setActiveKey] = useState<ProcessingKey | null>(null);
  const [amounts, setAmounts] = useState<Partial<Record<ProcessingKey, string>>>({});
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [inn, setInn] = useState("");
  const [noPrint, setNoPrint] = useState(false);
  const [showError, setShowError] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const rowsRef = useRef<HTMLDivElement>(null);

  const hasRows = rows.length > 0;
  // paid = sum of all entered amounts
  const paid = rows.reduce((sum, k) => sum + (parseFloat(amounts[k] ?? "0") || 0), 0);
  const change = Math.max(0, paid - cartTotal);
  const doplate = Math.max(0, cartTotal - paid);

  const handleProcessingClick = (key: ProcessingKey) => {
    setShowError(false);
    if (rows.includes(key)) {
      // already added — just re-highlight its button
      setActiveKey(key);
    } else {
      // add new row; default amount = current доплата (or full cartTotal if first row)
      const defaultAmt = rows.length === 0 ? cartTotal : Math.max(0, cartTotal - paid);
      setAmounts((a) => ({ ...a, [key]: String(defaultAmt) }));
      setRows((r) => [...r, key]);
      setActiveKey(key);
    }
  };

  const removeRow = (key: ProcessingKey) => {
    setRows((r) => r.filter((k) => k !== key));
    setAmounts((a) => { const n = { ...a }; delete n[key]; return n; });
    setActiveKey((prev) => (prev === key ? null : prev));
  };

  const handleConfirm = () => {
    if (!hasRows) { setShowError(true); return; }
    onConfirm();
  };

  const onRowScroll = () => {
    const el = rowsRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollRatio(max > 0 ? el.scrollTop / max : 0);
  };

  const dialogH = hasRows ? 813 : 677;
  // Scrollbar — always visible when rows exist (matches Figma Расчет12+)
  const ROWS_TOP = 419;  // matches Input3 top in Расчет14 (calc(50%+40.5px) − 28)
  const ROWS_MAX_H = 220;
  const TRACK_H = 393;
  // Thumb height: visible frame / total content * track, clamped to [30, TRACK_H]
  const rowsTotalH = Math.max(1, rows.length * 64); // 56px row + 8px gap
  const visibleRatio = Math.min(1, ROWS_MAX_H / rowsTotalH);
  const THUMB_H = Math.max(30, Math.round(TRACK_H * visibleRatio));
  const thumbTop = Math.round(scrollRatio * (TRACK_H - THUMB_H));

  const inputCls = "w-full bg-[#f9f9f9] rounded-[10px] px-4 py-[18px] text-[14px] font-normal text-[#252422] outline-none focus:ring-2 focus:ring-[#47d465]/30 transition-shadow";

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 50 }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#323232] opacity-43" onClick={onCancel} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[10px] transition-all duration-200 overflow-hidden"
        style={{ width: 1091, height: dialogH }}
      >
        {/* Close button × — top right */}
        <button onClick={onCancel}
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40 select-none"
          style={{ right: 15.71, top: 8, padding: 0, background: "none", border: "none" }}>
          <IconModalClose />
        </button>

        {/* Title */}
        <p className="absolute font-bold text-[24px] text-[#2b2b2b] left-[35px] top-[26px]">Расчет</p>

        {/* Section labels */}
        <p className="absolute font-medium text-[16px] text-[#252422]" style={{ left: 44, top: 91 }}>Личные данные</p>
        <p className="absolute font-medium text-[16px] text-[#252422]" style={{ left: 610, top: 91 }}>Процессинги</p>

        {/* Left: personal data inputs */}
        <div className="absolute flex flex-col gap-[14px]" style={{ left: 35, top: 113, width: 552 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail/Номер телефона" className={inputCls} />
          <input value={org} onChange={(e) => setOrg(e.target.value)}
            placeholder="Организация" className={inputCls} />
          <input value={inn} onChange={(e) => setInn(e.target.value)}
            placeholder="ИНН организации" className={inputCls} />
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
            <span className="text-[14px] font-normal text-[#252422]">Не печатать чек</span>
          </button>
        </div>

        {/* "Продажи" label — only when rows expanded */}
        {hasRows && (
          <p className="absolute font-medium text-[16px] text-[#252422]" style={{ left: 40, top: 378 }}>Продажи</p>
        )}

        {/* Scrollable rows frame — inside "Продажи" */}
        {hasRows && (
          <>
            <div
              ref={rowsRef}
              onScroll={onRowScroll}
              className="absolute flex flex-col gap-[8px] overflow-y-auto pr-[40px]"
              style={{ left: "3.21%", right: "5.13%", top: ROWS_TOP, maxHeight: ROWS_MAX_H, scrollbarWidth: "none" }}
            >
              {rows.map((key) => {
                const opt = PROCESSING_OPTIONS.find((o) => o.key === key)!;
                return (
                  <div key={key}
                    className="flex items-center bg-[#f9f9f9] rounded-[10px] px-4 shrink-0 transition-shadow hover:shadow-sm"
                    style={{ height: 56, gap: 40 }}>
                    {/* Label */}
                    <span className="text-[14px] font-normal text-[#303030] shrink-0" style={{ width: 89 }}>
                      {opt.label}
                    </span>
                    {/* Amount input box */}
                    <div className="relative shrink-0 bg-white rounded-[7px] flex items-center px-2"
                      style={{ width: 106, height: 40, border: "1px solid rgba(43,43,43,0.2)" }}>
                      <input
                        value={amounts[key] ?? ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, "");
                          setAmounts((a) => ({ ...a, [key]: val }));
                        }}
                        className="bg-transparent text-[14px] font-bold text-[#303030] outline-none text-right min-w-0 flex-1"
                        style={{ fontFeatureSettings: '"lnum","pnum"' }}
                      />
                      <span className="text-[14px] font-normal text-[#303030] ml-[2px] shrink-0">₽</span>
                    </div>
                    <div className="flex-1" />
                    {/* × remove */}
                    <button onClick={() => removeRow(key)}
                      className="cursor-pointer transition-opacity hover:opacity-70 active:opacity-40 shrink-0 select-none"
                      style={{ background: "none", border: "none", padding: 0 }}>
                      <IconRowRemove />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Custom scrollbar — Frame79 from Расчет14: w-0 container, SVG line paths */}
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
          </>
        )}

        {/* Error — only after confirm with no rows */}
        {showError && !hasRows && (
          <p className="absolute text-[14px] font-normal text-[#e67e46]" style={{ left: 40, top: 432 }}>
            Выберите процессинг
          </p>
        )}

        {/* Right: processing option buttons */}
        <div className="absolute flex flex-col gap-[11px]" style={{ left: 609, top: 113, width: 431 }}>
          {PROCESSING_OPTIONS.map((opt) => {
            const isActive = activeKey === opt.key && rows.includes(opt.key);
            return (
              <button key={opt.key} onClick={() => handleProcessingClick(opt.key)}
                className={[
                  "h-[56px] w-full rounded-[10px] flex items-center justify-center gap-[10px] text-[16px] font-semibold cursor-pointer select-none transition-all duration-150",
                  isActive
                    ? "bg-[#47d465] text-white hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
                    : "text-[#2b2b2b] hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]",
                ].join(" ")}
                style={!isActive ? { boxShadow: "inset 0 0 0 1px #47d465" } : {}}>
                {opt.key === "cash"  && <IconCash selected={isActive} />}
                {opt.key === "card"  && <IconCreditCard selected={isActive} />}
                {opt.key === "bonus" && <IconBonus selected={isActive} />}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Summary bar — Сумма / Доплата / Сдача */}
        <div className="absolute flex items-center justify-between text-[16px] font-medium text-[#252422] whitespace-nowrap"
          style={{ left: 40, right: 40, bottom: 158 }}>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Сумма "}<span className="font-bold">{cartTotal} ₽</span>
          </p>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Доплата "}<span className="font-bold">{doplate} ₽</span>
          </p>
          <p style={{ fontFeatureSettings: '"lnum","pnum"' }}>
            {"Сдача "}<span className="font-bold">{change} ₽</span>
          </p>
        </div>

        {/* Divider */}
        <div className="absolute left-0 right-0 h-px bg-[#f0f0f0]" style={{ bottom: 113 }} />

        {/* Bottom buttons */}
        <div className="absolute flex items-center gap-[17px]"
          style={{ bottom: 29, left: "50%", transform: "translateX(-50%)" }}>
          <button onClick={handleConfirm}
            className={[
              "w-[360px] h-[56px] rounded-[10px] text-[16px] font-semibold text-white bg-[#47d465] select-none transition-all duration-150",
              hasRows
                ? "cursor-pointer hover:bg-[#3dc05a] active:bg-[#30a84a] active:scale-[0.98]"
                : "opacity-50 cursor-default",
            ].join(" ")}>
            Расчет
          </button>
          <button onClick={onCancel}
            className="w-[360px] h-[56px] rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]"
            style={{ boxShadow: "inset 0 0 0 1px #47d465" }}>
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

function RegistrationScreen({ phone, onCancel, onSave, onSaveAndPurchase }: {
  phone: string; onCancel: () => void; onSave: () => void; onSaveAndPurchase: () => void;
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
        <button onClick={requiredFilled ? onSaveAndPurchase : undefined}
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

// ─── Phone Modal ──────────────────────────────────────────────────────────────

function PhoneModal({ onClose, onSuccess }: { onClose: () => void; onSuccess?: (phone: string) => void }) {
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Digits only, max 11
  const digits = phone.replace(/\D/g, "").slice(0, 11);
  const isValid = digits.length === 11;

  // Focus input on open
  useEffect(() => { if (!accepted) inputRef.current?.focus(); }, [accepted]);

  const handleOk = () => {
    if (!accepted && isValid) { setAccepted(true); return; }
    if (accepted) { onSuccess ? onSuccess(digits) : onClose(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (accepted) return;
    setPhone(e.target.value);
  };

  const handleClear = () => { setPhone(""); setAccepted(false); };

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 60 }}>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "#403e3e", opacity: 0.41 }} onClick={onClose} />

      {/* Dialog — w-596 h-298, centered per Figma: left calc(50%-7px) top calc(50%-42px) */}
      <div className="absolute bg-white rounded-[10px] overflow-hidden"
        style={{ width: 596, height: 298, left: "calc(50% - 7px)", top: "calc(50% - 42px)", transform: "translate(-50%,-50%)" }}>

        {/* Close × — top-left rotated cross (Group1 from import) */}
        <button onClick={onClose}
          className="absolute cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
          style={{ left: 0, top: 0, width: 596 * 0.0821, height: 298 * 0.1879, background: "none", border: "none", padding: 0 }}>
          <div className="absolute flex items-center justify-center"
            style={{ inset: `${298 * 0.0671}px ${596 * 0.0279}px ${298 * 0.8139}px ${596 * 0.9178}px`, containerType: "size" }}>
            <div style={{ transform: "rotate(-47.64deg) skewX(-5.27deg)" }}>
              <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
                <path d={svgVvod.p31ed2680} fill="#303030" />
              </svg>
            </div>
          </div>
        </button>

        {/* Title */}
        <p className="absolute font-bold text-[24px] text-[#2b2b2b] text-center whitespace-nowrap"
          style={{ top: 60, left: "50%", transform: "translateX(-50%)", fontFamily: "Raleway, sans-serif" }}>
          Введите номер телефона
        </p>

        {/* Input field — h-60 w-536 left-30 top-112 */}
        <div className="absolute flex items-center gap-[10px] rounded-[10px] px-[16px] transition-shadow"
          style={{ left: 30, top: 112, width: 536, height: 60, backgroundColor: "#f8f8f8",
            boxShadow: !accepted && phone.length > 0 && !isValid ? "0 0 0 2px rgba(249,91,28,0.35)" : undefined }}>
          {/* Icon: red × (invalid/empty) or green ✓ (valid/accepted) */}
          {accepted || isValid ? (
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
              <g clipPath="url(#cp-ok)">
                <path d={svgNomer.p303b2600} fill="#47D465" />
              </g>
              <defs><clipPath id="cp-ok"><rect fill="white" width="24" height="24" /></clipPath></defs>
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
              <g id="Frame 1321315634">
                <circle cx="12" cy="12" fill="#E95525" fillOpacity="0.1" r="12" />
                <path d={svgVvod.pa881280} fill="#F95B1C" />
              </g>
            </svg>
          )}
          {accepted ? (
            /* Accepted state: show number as text, non-editable */
            <span className="font-semibold text-[14px] text-[#2b2b2b] select-none"
              style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}>
              {digits}
            </span>
          ) : (
            <input
              ref={inputRef}
              type="tel"
              value={phone}
              onChange={handleInput}
              placeholder="+7 (___) ___-__-__"
              className="flex-1 bg-transparent text-[14px] font-semibold text-[#2b2b2b] outline-none placeholder:opacity-40"
              style={{ fontFamily: "Raleway, sans-serif", fontFeatureSettings: '"lnum","pnum"' }}
              onKeyDown={(e) => { if (e.key === "Enter" && isValid) handleOk(); if (e.key === "Escape") onClose(); }}
            />
          )}
          {/* Clear button when has text and not accepted */}
          {!accepted && phone.length > 0 && (
            <button onClick={handleClear}
              className="shrink-0 cursor-pointer transition-opacity hover:opacity-60 active:opacity-40"
              style={{ background: "none", border: "none", padding: 0 }}>
              <svg fill="none" viewBox="0 0 14 14" style={{ width: 14, height: 14 }}>
                <path d="M1 1L13 13M13 1L1 13" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* "Ок" button — left-30 top-198 w-262 h-56; disabled until valid */}
        <button
          onClick={handleOk}
          disabled={!isValid && !accepted}
          className={[
            "absolute rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] select-none transition-all duration-150",
            (isValid || accepted)
              ? "cursor-pointer hover:bg-[#f0fdf4] active:bg-[#dcfce7] active:scale-[0.98]"
              : "opacity-52 cursor-default",
          ].join(" ")}
          style={{ left: 30, top: 198, width: 262, height: 56,
            border: "1px solid #47d465", fontFamily: "Raleway, sans-serif" }}>
          Ок
        </button>

        {/* "Отмена" button — left-304 top-198 w-262 h-56 */}
        <button
          onClick={onClose}
          className="absolute rounded-[10px] text-[14px] font-semibold text-[#2b2b2b] cursor-pointer select-none transition-all duration-150 hover:bg-[#f5f5f5] active:bg-[#ebebeb] active:scale-[0.98]"
          style={{ left: 304, top: 198, width: 262, height: 56,
            border: "1px solid #47d465", fontFamily: "Raleway, sans-serif" }}>
          Отмена
        </button>
      </div>
    </div>
  );
}

// ─── Card Scan Modal ──────────────────────────────────────────────────────────

function CardScanModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) onSuccess();
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
          Считайте карту
        </p>
        {/* Input field */}
        <div className="absolute flex items-center rounded-[10px] transition-shadow focus-within:ring-2 focus-within:ring-[#47d465]/30"
          style={{ left: 30, top: 112, width: 536, height: 60, backgroundColor: "#f8f8f8" }}>
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

function PosScreen({ dark, onLogout }: { dark: boolean; onLogout: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [adminMode, setAdminMode] = useState(false);
  const [showPayment, setShowPayment]         = useState(false);
  const [showPhone, setShowPhone]             = useState(false);
  const [showRegister, setShowRegister]       = useState(false);
  const [registeredPhone, setRegisteredPhone] = useState("");
  const [showCardScan, setShowCardScan]       = useState(false);
  const [showClientInfo, setShowClientInfo]   = useState(false);
  const c = th(dark);

  const addToCart = (p: Product) =>
    setCartItems((prev) => [...prev, { id: nextCartId++, productId: p.id, name: p.name, price: p.price }]);
  const clearCart      = () => setCartItems([]);
  const deleteLastItem = () => setCartItems((prev) => prev.slice(0, -1));
  const addMoreLast    = () => {
    if (!cartItems.length) return;
    const last = cartItems[cartItems.length - 1];
    setCartItems((prev) => [...prev, { id: nextCartId++, productId: last.productId, name: last.name, price: last.price }]);
  };

  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  return (
    <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: c.screenBg }}>
      <LeftSidebar dark={dark} adminMode={adminMode} onLogout={onLogout} onUserPlus={() => setShowPhone(true)} />
      <TopBar dark={dark} adminMode={adminMode} onAdminToggle={() => setAdminMode((m) => !m)}
        activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Collapse arrow — left-1077 top-43 size-46 (visible when cart has items per Figma) */}
      {cartItems.length > 0 && (
        <div className="absolute left-[1077px] top-[43px] size-[46px] rounded-[10px] bg-white flex items-center justify-center cursor-pointer transition-shadow hover:shadow-md active:shadow-sm drop-shadow-[0px_4px_8.75px_rgba(174,174,177,0.25)] select-none">
          <div className="rotate-180"><IconAngleRight color="#303030" /></div>
        </div>
      )}

      <ProductGrid dark={dark} onAdd={addToCart} />
      <BottomBar dark={dark} onClientInfo={() => setShowCardScan(true)} />
      <ReceiptPanel
        dark={dark}
        cartItems={cartItems}
        onClear={clearCart}
        onDelete={deleteLastItem}
        onAdd={addMoreLast}
        onCheckout={() => cartItems.length > 0 && setShowPayment(true)}
      />

      {showPayment && (
        <PaymentModal
          cartTotal={cartTotal}
          onConfirm={() => { clearCart(); setShowPayment(false); }}
          onCancel={() => setShowPayment(false)}
        />
      )}
      {showPhone && (
        <PhoneModal
          onClose={() => setShowPhone(false)}
          onSuccess={(phone) => {
            setShowPhone(false);
            setRegisteredPhone(phone);
            setShowRegister(true);
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
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scale, setScale] = useState(1);
  const [screen, setScreen] = useState<Screen>("login-password");
  const [darkTheme, setDarkTheme] = useState(false);

  useLayoutEffect(() => {
    const compute = () => setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 1024));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: th(darkTheme).screenBg }}>
      <div style={{ width: 1440, height: 1024, transformOrigin: "top left", transform: `scale(${scale})`, position: "absolute", top: 0, left: 0 }}>
        {screen === "login-password" && (
          <LoginPasswordScreen dark={darkTheme} onLogin={() => setScreen("select-installation")} onSwitchToPin={() => setScreen("login-pin")} />
        )}
        {screen === "login-pin" && (
          <LoginPinScreen dark={darkTheme} onLogin={() => setScreen("select-installation")} onSwitchToPassword={() => setScreen("login-password")} />
        )}
        {screen === "select-installation" && (
          <SelectInstallationScreen dark={darkTheme} onOk={() => setScreen("settings")} onCancel={() => setScreen("login-password")} />
        )}
        {screen === "settings" && (
          <SettingsScreen dark={darkTheme} onDarkToggle={() => setDarkTheme((d) => !d)} onSave={() => setScreen("pos")} onBack={() => setScreen("select-installation")} />
        )}
        {screen === "pos" && (
          <PosScreen dark={darkTheme} onLogout={() => setScreen("login-password")} />
        )}
      </div>
    </div>
  );
}
