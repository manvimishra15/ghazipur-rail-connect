import { useEffect, useState } from "react";
import { Download, BookOpen, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/SectionHeading";
import { ebooksApi, type Ebook } from "@/services/ebooks";
import { knowledgeCentreCategories } from "@/data/mock";

export default function KnowledgeCentre() {
  const [ebooks, setEbooks] = useState<Ebook[] | null>(null);
  const [lang, setLang] = useState<string>("all");

  useEffect(() => {
    const params = lang === "all" ? undefined : { language: lang };
    setEbooks(null);
    ebooksApi.list(params).then(setEbooks).catch(() => setEbooks([]));
  }, [lang]);

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Knowledge Centre</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Knowledge Centre</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Category-based access to reference material, manuals, circulars and downloadable study resources.
          </p>
        </div>
      </section>

      <Tabs defaultValue="categories">
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="container-page">
            <TabsList className="h-12 bg-transparent gap-1">
              <TabsTrigger value="categories" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                Reference Categories
              </TabsTrigger>
              <TabsTrigger value="ebooks" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                E-Books & Downloads
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="categories" className="mt-0">
          <section className="container-page section-y">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {knowledgeCentreCategories.map((category) => (
                <Card key={category.title} className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  <CardContent className="p-6">
                    <SectionHeading title={category.title} />
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {category.items.map((item) => (
                        <li key={item} className="rounded-lg bg-secondary/50 px-3 py-2">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="ebooks" className="mt-0">
          <section className="container-page section-y">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <SectionHeading title="E-Books & Study Materials" />
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {["all", "English", "Hindi"].map((l) => (
                  <Button key={l} variant={lang === l ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setLang(l)}>
                    {l === "all" ? "All Languages" : l}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ebooks === null && Array.from({ length: 6 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-40 rounded-xl" />)}
              {ebooks !== null && ebooks.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground rounded-xl border border-dashed border-border">
                  <BookOpen className="h-12 w-12 mb-3 opacity-30" />
                  <p>No e-books available yet.</p>
                </div>
              )}
              {ebooks !== null && ebooks.length > 0 && ebooks.map((book) => (
                <Card key={book.id} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">{book.language}</Badge>
                    </div>
                    <h3 className="mt-3 font-display font-semibold leading-snug">{book.title}</h3>
                    {book.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.description}</p>}
                    <div className="mt-2 text-xs text-primary font-medium">{book.category}</div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{book.download_count} downloads</span>
                      <Button asChild size="sm" variant="outline" onClick={() => ebooksApi.download(book.id)}>
                        <a href={book.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-3.5 w-3.5 mr-1" /> Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </>
  );
}
