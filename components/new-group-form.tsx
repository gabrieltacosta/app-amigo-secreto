"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface Participant {
  name: string;
  email: string;
}

const formSchema = z.object({
  group_name: z.string().min(3, "Digite no minímo 3 caracteres!"),
  name: z.string().min(1, "Digite o nome do participante"),
  email: z.email("Digite um email válido"),
});

export default function NewGroupForm({
  loggedUser,
}: {
  loggedUser: { email: string; id: string };
}) {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      name: "",
      email: loggedUser.email,
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: "",
      name: "",
      email: "",
    },
  });

  function updateParticipant(
    index: number,
    field: keyof Participant,
    value: string
  ) {
    const updateParticipant = [...participants];

    updateParticipant[index][field] = value;
    setParticipants(updateParticipant);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle>Novo groupo</CardTitle>
        <CardDescription>Convide seus amigos para participar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="group_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do grupo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do grupo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="mt-12! mb-4">Participantes</h2>
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4"
              >
                <div className="grow space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o nome da pessoa"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grow space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={participant.email || loggedUser.email}
                            onChange={(e) => {
                              updateParticipant(index, "email", e.target.value);
                              field.onChange(e);
                            }}
                            placeholder="Digite o email da pessoa"
                            className="readonly:text-muted-foreground"
                            readOnly={index === 0}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
