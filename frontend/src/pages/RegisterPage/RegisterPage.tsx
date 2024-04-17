import InputForm from "./components/InputForm";

export default function RegisterPage() {
  return (
    <main className="w-auto h-screen bg-cpc-blue flex flex-col justify-items-center items-center space-y-8 p-16">
      <div className="text-white font-dm-mono text-7xl drop-shadow-md">
        Register
      </div>
      <div
        style={{ boxShadow: "4px 4px 5px 0 rgba(0, 0, 0, 0.25)" }}
        className="bg-cpc-light-gray p-8 rounded-md bg-opacity-90"
      >
        <InputForm />
      </div>
      <div style={{textShadow : "2px 2px 1px rgba(0, 0, 0, 0.25)"}} className="flex flex-row font-monospace text-cpc-orange text-2xl space-x-2">
        <div className="italic">WARNING : </div>
        <div>
          เว็บไซต์นี้สามารถช่วยเปิดโอกาสให้คุณเริ่มบทสนทนากับคนอื่นได้
          แต่ไม่ช่วยให้ได้คบ
        </div>
      </div>
      
    </main>
  );
}
