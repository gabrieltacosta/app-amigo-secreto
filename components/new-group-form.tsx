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
import { Label } from "./ui/label";

interface Participant {
  name: string;
  email: string;
}

const formSchema = z.object({
  group_name: z.string().min(3, "Digite no minímo 3 caracteres!"),
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
    <Card className="w-full max-w-2xl mx-auto">
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
                className="felx flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"
              >
                <div className="grow space-y-2 w-full">
                  <Label htmlFor={`name-${index}`}>Nome</Label>
                  <Input
                    id={`name-${index}`}
                    name="name"
                    value={participant.name}
                    onChange={(e) => {
                      updateParticipant(index, "name", e.target.value);
                    }}
                    placeholder="Digite o nome da pessoa"
                    required
                  />
                </div>
                <div className="grow space-y-2 w-full">
                  <Label htmlFor={`email-${index}`}>Email</Label>
                  <Input
                    id={`email-${index}`}
                    name="email"
                    type="email"
                    value={participant.email}
                    onChange={(e) => {
                      updateParticipant(index, "email", e.target.value);
                    }}
                    placeholder="Digite o email da pessoa"
                    className="readonly:text-muted-foreground"
                    readOnly={participant.email === loggedUser.email}
                    required
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
