"use client";

import { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Mail, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { fi } from "zod/locales";

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

  function removeParticipant(index: number) {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  }

  function addParticipant() {
    setParticipants([...participants, { name: "", email: "" }]);
  }

  function onSubmit() {
    const data = form.getValues();
    console.log("Form Data:", data);
    console.log("Participants:", participants);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto shadow-2xl">
          <CardHeader>
            <CardTitle>Novo groupo</CardTitle>
            <CardDescription>
              Convide seus amigos para participar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center space-y-4 w-full"
              >
                <div className="md:col-span-5 space-y-2">
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da pessoa"
                        value={participant.name}
                        onChange={(e) =>
                          updateParticipant(index, "name", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className="md:col-span-6 space-y-2">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={participant.email}
                        onChange={(e) =>
                          updateParticipant(index, "email", e.target.value)
                        }
                        placeholder="Digite o email da pessoa"
                        className="readonly:text-muted-foreground"
                        readOnly={index === 0}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className="md:col-span-1 flex justify-center">
                  {participants.length > 1 &&
                    participant.email !== loggedUser.email && (
                      <Button
                        type="button"
                        variant="outline"
                        size={"icon"}
                        onClick={() => removeParticipant(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </CardContent>

          <Separator className="my-4" />
          <CardFooter>
            <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0 w-full">
              <Button
                variant="outline"
                type="button"
                onClick={addParticipant}
                className="w-full md:w-auto"
              >
                Adicional amigo
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2 w-full md:w-auto"
              >
                <Mail className="h-3 w-3" /> Criar grupo e enviar emails
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
