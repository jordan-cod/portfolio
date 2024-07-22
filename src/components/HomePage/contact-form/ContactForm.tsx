"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import styles from "./ContactForm.module.css";
import { useTranslations } from "next-intl";

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

export default function ContactForm() {
    const t = useTranslations("HomePage");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [statusClass, setStatusClass] = useState<string>("");

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    function validate(): Errors {
        const newErrors: Errors = {};
        if (!formData.name) newErrors.name = t("contact.validate.name.empty");
        if (!formData.email)
            newErrors.email = t("contact.validate.e-mail.empty");
        if (!formData.message)
            newErrors.message = t("contact.validate.message.empty");
        if (formData.name.length > 100)
            newErrors.name = t("contact.validate.name.limit");
        if (formData.email.length > 100)
            newErrors.email = t("contact.validate.e-mail.limit");
        if (formData.message.length > 255)
            newErrors.message = t("contact.validate.message.limit");
        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = t("contact.validate.e-mail.invalid");
        }
        return newErrors;
    }

    async function submitForm(e: FormEvent) {
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
            showStatusMessage(
                t("contact.validate.status-message.success"),
                "success",
            );
        } catch (error) {
            showStatusMessage(
                t("contact.validate.status-message.error"),
                "error",
            );
        } finally {
            setSubmitting(false);
        }
    }

    function showStatusMessage(message: string, type: string) {
        setStatusMessage(message);
        setStatusClass(type);

        setTimeout(() => {
            setStatusMessage("");
            setStatusClass("");
        }, 5000);
    }

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
                    <p>{t("contact.subtitle")}</p>
                </div>
                <form id="contact-form" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="name">
                            {t("contact.form.name.label")}
                            <span> *</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder={t("contact.form.name.placeholder")}
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
                            {t("contact.form.e-mail.label")}
                            <span> *</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder={t("contact.form.e-mail.placeholder")}
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
                            {t("contact.form.message.label")}
                            <span> *</span>
                        </label>
                        <textarea
                            id="message"
                            placeholder={t("contact.form.message.placeholder")}
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
                        {submitting
                            ? t("contact.button.sending")
                            : t("contact.button.static")}
                    </button>
                </form>
                <div id="status-message" className={statusClass}>
                    {statusMessage}
                </div>
            </div>
        </section>
    );
}
