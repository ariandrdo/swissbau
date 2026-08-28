import { motion } from "motion/react";

export function Datenschutz() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 100% 0%, rgba(217,20,34,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(61,197,229,0.10) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-6xl font-bold"
          >
            Datenschutzerklärung
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenbearbeitung auf dieser Website ist:<br />
              SwissBau Renovationen GmbH<br />
              Steigstrasse 19, Winterthur<br />
              E-Mail:{" "}
              <a href="mailto:aliji.nazli@gmail.com" className="text-[#d91422] hover:underline">
                aliji.nazli@gmail.com
              </a>
              <br />
              Telefon: 079 726 19 83
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">2. Grundsätzliches</h2>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten ernst und bearbeiten sie gemäss dem Schweizer Bundesgesetz über den
              Datenschutz (DSG) sowie – soweit anwendbar – der Datenschutz-Grundverordnung (DSGVO). Diese Datenschutzerklärung
              informiert Sie darüber, welche Daten wir erheben, wozu wir sie verwenden und welche Rechte Ihnen zustehen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">3. Welche Daten wir erheben</h2>
            <p className="mb-3">
              Wenn Sie unser Kontaktformular nutzen, erheben wir die von Ihnen eingegebenen Daten, namentlich:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (falls angegeben)</li>
              <li>Ihre Nachricht sowie Angaben zur gewünschten Dienstleistung</li>
            </ul>
            <p className="mt-3">
              Beim Besuch unserer Website werden zudem technische Daten (z. B. IP-Adresse, Browsertyp, Zugriffszeitpunkt) durch
              unseren Hosting-Anbieter automatisch verarbeitet, um den Betrieb der Website sicherzustellen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">4. Zweck der Datenbearbeitung</h2>
            <p>
              Die über das Kontaktformular übermittelten Daten verwenden wir ausschliesslich, um Ihre Anfrage zu bearbeiten, Ihnen
              eine Offerte zu erstellen oder mit Ihnen in Kontakt zu treten. Eine Weitergabe an Dritte erfolgt nicht, ausser an
              technische Dienstleister, die für den Betrieb der Website notwendig sind (siehe Ziffer 5).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">5. Hosting &amp; Drittanbieter</h2>
            <p>
              Für den Betrieb dieser Website und die Speicherung der über das Kontaktformular übermittelten Daten setzen wir einen
              spezialisierten Hosting- und Datenbank-Dienstleister ein. Die Daten werden dabei auf Servern im Vereinigten Königreich
              (UK) verarbeitet und gespeichert. Das Vereinigte Königreich verfügt gemäss dem Eidgenössischen Datenschutz- und
              Öffentlichkeitsbeauftragten (EDÖB) über ein angemessenes Datenschutzniveau. Falls in einzelnen Seiten eine
              Google-Maps-Karte eingebunden ist, verarbeitet Google beim Laden dieser Karte ebenfalls Daten gemäss den eigenen
              Datenschutzbestimmungen von Google.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">6. Aufbewahrungsdauer</h2>
            <p>
              Wir bearbeiten und speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung des Zwecks
              erforderlich ist, für den sie erhoben wurden, bzw. so lange es gesetzliche Aufbewahrungsfristen vorsehen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">7. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft über die von uns bearbeiteten Daten, deren Berichtigung, Löschung oder
              Einschränkung der Bearbeitung, sofern keine gesetzliche Pflicht zur Aufbewahrung entgegensteht. Kontaktieren Sie uns
              dazu einfach über die oben angegebenen Kontaktdaten.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-4">8. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, um sie an geänderte Rechtslagen oder
              Änderungen unserer Website und Dienstleistungen anzupassen. Die jeweils aktuelle Fassung ist auf dieser Seite
              abrufbar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
