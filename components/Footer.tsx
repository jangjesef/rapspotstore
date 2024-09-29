export function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-muted-foreground py-4 bg-background">
      © {new Date().getFullYear()} Rapspot. Všechna práva vyhrazena.
    </footer>
  );
}