"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import styles from "./ContactForm.module.css";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface Errors {
    name?: string;
    email?: string;
    message?: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [statusClass, setStatusClass] = useState<string>("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.name) newErrors.name = "Por favor, insira seu nome.";
        if (!formData.email) newErrors.email = "Por favor, insira seu email.";
        if (!formData.message)
            newErrors.message = "Por favor, insira uma mensagem.";
        if (formData.name.length > 100)
            newErrors.name = "O nome deve ter no máximo 100 caracteres.";
        if (formData.email.length > 100)
            newErrors.email = "O email deve ter no máximo 100 caracteres.";
        if (formData.message.length > 255)
            newErrors.message = "A mensagem deve ter no máximo 255 caracteres.";
        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Por favor, insira um email válido.";
        }
        return newErrors;
    };

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        setErrors({});
        // Simulação de envio para o backend
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",
                    body: JSON.stringify({
                        title: formData.name + formData.email,
                        body: formData.message,
                        userId: 1,
                    }),
                },
            );
            if (!response.ok) {
                throw new Error("Erro ao enviar mensagem.");
            }
            setFormData({
                name: "",
                email: "",
                message: "",
            });
            showStatusMessage("Mensagem enviada com sucesso!", "success");
        } catch (error) {
            showStatusMessage(
                "Erro ao enviar mensagem. Tente novamente mais tarde.",
                "error",
            );
        } finally {
            setSubmitting(false);
        }
    };

    const showStatusMessage = (message: string, type: string) => {
        setStatusMessage(message);
        setStatusClass(type);

        setTimeout(() => {
            setStatusMessage("");
            setStatusClass("");
        }, 5000);
    };

    return (
        <section id="contact" className={styles.contact}>
            <div>
                <div>
                    <div>
                        <Image
                            src="/contact.svg"
                            alt="Entre em contato"
                            width={300}
                            height={280}
                        />
                    </div>
                    <h3>Entre em contato</h3>
                    <p>
                        Estamos aqui para ajudar! Entre em contato conosco para
                        solucionar suas necessidades de transporte.
                    </p>
                </div>
                <form id="contact-form" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="name">
                            Nome<span> *</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            maxLength={100}
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? styles.invalid : ""}
                        />
                        {errors.name && (
                            <div className={styles.error}>{errors.name}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email">
                            E-mail<span> *</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="contato@exemplo.com"
                            maxLength={100}
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? styles.invalid : ""}
                        />
                        {errors.email && (
                            <div className={styles.error}>{errors.email}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="message">
                            Mensagem<span> *</span>
                        </label>
                        <textarea
                            id="message"
                            placeholder="Sua mensagem"
                            maxLength={255}
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? styles.invalid : ""}
                        />
                        {errors.message && (
                            <div className={styles.error}>{errors.message}</div>
                        )}
                    </div>
                    <button
                        id="submit"
                        disabled={submitting}
                        className={submitting ? styles.disabled : ""}
                    >
                        {submitting ? "Enviando..." : "Enviar"}
                    </button>
                </form>
                <div id="status-message" className={statusClass}>
                    {statusMessage}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
