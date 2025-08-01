import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { sendTelegramMessage } from "@/lib/telegram";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

interface EmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: string; // Например, 'Начать играть', 'Подключиться', etc
}

type EmailFormValues = {
  email: string;
};

export const EmailModal: React.FC<EmailModalProps> = ({ open, onOpenChange, context }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<EmailFormValues>({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: EmailFormValues) => {
    setLoading(true);
    setSuccess(false);
    const message = `📧 Email: ${data.email}\nКонтекст: ${context || "-"}`;
    const ok = await sendTelegramMessage(message);
    setLoading(false);
    setSuccess(ok);
    if (ok) {
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        form.reset();
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('ENTER_EMAIL', 'Введите ваш email')}</DialogTitle>
          <DialogDescription>
            {t('EMAIL_DESCRIPTION', 'Мы отправим уведомление или доступ на вашу почту.')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: t('EMAIL_REQUIRED', 'Email обязателен'),
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: t('EMAIL_INVALID', 'Введите корректный email'),
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('EMAIL', 'Email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('EMAIL_PLACEHOLDER', 'your@email.com')} {...field} disabled={loading || success} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading || success} className="w-full">
                {loading ? t('SENDING', 'Отправка...') : success ? t('SUCCESS', 'Успешно!') : t('SEND', 'Отправить')}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost" className="w-full mt-2" disabled={loading}>
                  {t('CANCEL', 'Отмена')}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal; 