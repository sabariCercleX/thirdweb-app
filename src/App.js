import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <div className="container">
      <main className="main">
      
        <div className="connect">
          <ConnectWallet dropdownPosition={{ side: 'bottom', align: 'center'}} />
        </div>

      </main>
    </div>
  );
}
