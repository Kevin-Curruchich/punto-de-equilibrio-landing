import { useMemo, useState } from "react";
import type { FormEvent } from "react";

const SUPPORT_EMAIL = "hola@puntodeequilibrio.mx";

const deletionSteps = [
  "Inicia sesión en la aplicación con la cuenta que deseas eliminar.",
  "Ve a Configuración > Cuenta > Eliminar cuenta.",
  "Confirma la solicitud de eliminación y sigue las instrucciones en pantalla.",
  "Recibirás una confirmación dentro de la app y/o por correo electrónico.",
];

type DeleteRequestFormData = {
  fullName: string;
  contactEmail: string;
  accountEmail: string;
  reason: string;
  details: string;
  confirmOwnership: boolean;
};

const initialFormData: DeleteRequestFormData = {
  fullName: "",
  contactEmail: "",
  accountEmail: "",
  reason: "",
  details: "",
  confirmOwnership: false,
};

const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export default function DeleteAccountPage() {
  const [formData, setFormData] =
    useState<DeleteRequestFormData>(initialFormData);
  const [formError, setFormError] = useState<string>("");
  const [requestSent, setRequestSent] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      formData.fullName.trim().length >= 3 &&
      isEmail(formData.contactEmail) &&
      isEmail(formData.accountEmail) &&
      formData.reason.trim().length >= 4 &&
      formData.confirmOwnership
    );
  }, [formData]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!canSubmit) {
      setFormError(
        "Completa todos los campos obligatorios y confirma que eres titular de la cuenta.",
      );
      return;
    }

    const body = [
      "Hola equipo de soporte,",
      "",
      "Solicito la eliminacion de mi cuenta.",
      "",
      `Nombre completo: ${formData.fullName.trim()}`,
      `Correo de contacto: ${formData.contactEmail.trim()}`,
      `Correo de la cuenta en la app: ${formData.accountEmail.trim()}`,
      `Motivo: ${formData.reason.trim()}`,
      `Detalles adicionales: ${formData.details.trim() || "No aplica"}`,
      "",
      "Declaro que soy titular de la cuenta y autorizo su eliminacion.",
    ].join("\n");

    const subject = encodeURIComponent("Solicitud de eliminacion de cuenta");
    const mailBody = encodeURIComponent(body);

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${mailBody}`;
    setRequestSent(true);
  };

  return (
    <div className="min-h-screen bg-cream text-k-text">
      <main className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <a
          href="/"
          className="inline-flex items-center text-sm font-medium text-k-primary hover:text-k-green-dark transition-colors"
        >
          ← Volver al inicio
        </a>

        <header className="mt-7 md:mt-10 border-b border-border pb-7">
          <p className="text-xs uppercase tracking-[0.1em] text-k-text-muted">
            Soporte de cuenta
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-normal leading-tight">
            Eliminación de Cuenta
          </h1>
          <p className="mt-4 text-sm md:text-base text-k-text-secondary leading-relaxed max-w-3xl">
            Si deseas eliminar tu cuenta de la aplicación, aquí encontrarás el
            proceso oficial y la información sobre qué datos se eliminan.
          </p>
          <p className="mt-4 text-xs text-k-text-muted">
            Última actualización: 26 de mayo de 2026
          </p>
        </header>

        <section className="mt-8 md:mt-10 space-y-8">
          <article className="rounded-xl border border-border bg-white/70 p-5 md:p-7 shadow-sm">
            <h2 className="text-lg md:text-xl font-medium text-k-text">
              Formulario de solicitud de eliminación
            </h2>
            <p className="mt-2 text-sm md:text-base text-k-text-secondary leading-relaxed">
              Completa este formulario para generar tu solicitud. Al enviar, se
              abrirá tu cliente de correo con la información prellenada para que
              puedas confirmar el envío.
            </p>

            {requestSent && (
              <p className="mt-4 rounded-md border border-k-primary/40 bg-k-primary/10 px-3 py-2 text-sm text-k-text">
                Solicitud preparada correctamente. Si no se abrió tu correo,
                escribe a {SUPPORT_EMAIL} con la misma información.
              </p>
            )}

            {formError && (
              <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </p>
            )}

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-k-text">
                    Nombre completo *
                  </span>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        fullName: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-k-primary/35"
                    placeholder="Ej. Laura Martinez"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-k-text">
                    Correo de contacto *
                  </span>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactEmail: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-k-primary/35"
                    placeholder="tu-correo@dominio.com"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-k-text">
                  Correo asociado a la cuenta en la app *
                </span>
                <input
                  type="email"
                  value={formData.accountEmail}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountEmail: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-k-primary/35"
                  placeholder="correo-con-el-que-te-registraste@dominio.com"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-k-text">
                  Motivo de la solicitud *
                </span>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      reason: event.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-k-primary/35"
                  placeholder="Ej. Ya no usare la plataforma"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-k-text">
                  Detalles adicionales (opcional)
                </span>
                <textarea
                  value={formData.details}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: event.target.value,
                    }))
                  }
                  className="mt-1.5 min-h-[110px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-k-primary/35"
                  placeholder="Si deseas, agrega contexto para soporte"
                />
              </label>

              <label className="flex items-start gap-2 text-sm text-k-text-secondary">
                <input
                  type="checkbox"
                  checked={formData.confirmOwnership}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmOwnership: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-border text-k-primary focus:ring-k-primary"
                  required
                />
                <span>
                  Confirmo que soy titular de la cuenta y autorizo su
                  eliminación.
                </span>
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded-full bg-k-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-k-green-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                Enviar solicitud de eliminación
              </button>
            </form>
          </article>

          <article>
            <h2 className="text-lg md:text-xl font-medium text-k-text">
              Datos que se eliminan
            </h2>
            <p className="mt-2 text-sm md:text-base text-k-text-secondary leading-relaxed">
              Se elimina el acceso de tu cuenta, datos de perfil y la
              información vinculada al uso de la aplicación de acuerdo con la
              normativa aplicable.
            </p>
          </article>

          <article>
            <h2 className="text-lg md:text-xl font-medium text-k-text">
              Tiempo de procesamiento
            </h2>
            <p className="mt-2 text-sm md:text-base text-k-text-secondary leading-relaxed">
              Procesamos las solicitudes de eliminación en un plazo máximo de 30
              días naturales, salvo que la ley exija un plazo distinto.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
