# Testrunda: fungerar mallen i GitHub Copilot?

En kodagent kan inte styra VS Code, så det här görs av en människa. Kör rundan när något i mallen har ändrats som rör instruktioner, skills, MCP-servrar, hooks eller installationen. Det tar ungefär en kvart.

Du behöver VS Code med tillägget GitHub Copilot Chat och en Copilot-licens. Välj agentläget (*Agent*) i chatten.

## Från tom mapp

1. Skapa en tom mapp och öppna den i VS Code (*File → Open Folder*).
2. Öppna Copilot-chatten och klistra in länken till mallen: `https://github.com/emarkensten/sj-design-code-template` och en kort beställning, till exempel *"Gör en sida där resenären ser sina kommande resor"*.
3. **Kontrollera:** agenten hämtar mallen, kör `npm run setup` och stannar sedan och ber dig starta om (det obligatoriska stoppet). Den ska inte börja bygga.
4. **Kontrollera:** filen `.omstart.md` finns i mappen och innehåller din beställning.
5. Starta om enligt agentens instruktion. Godkänn MCP-servrarna om VS Code frågar.
6. Skriv *"fortsätt"* i den nya chatten.
7. **Kontrollera:** agenten läser `.omstart.md`, tar vid med beställningen och tar bort filen.

## I den nya sessionen

8. Fråga: *"Vilka skills har du tillgång till?"* **Kontrollera:** `sj-design-system`, `impeccable` och `break-ui` finns med.
9. Fråga: *"Vilka props har DepartureCard? Använd SJ:s Storybook."* **Kontrollera:** svaret kommer från MCP-servern `sj-storybook` (Copilot visar verktygsanropet), inte från en gissning.
10. Fråga: *"Hämta SJ:s riktlinje om tomma tillstånd."* **Kontrollera:** agenten anropar `sj-design-system` (`get_guideline_page_content`).
11. **Kontrollera:** agenten följer AGENTS.md: skriver på svenska, frågar efter Figma-skisser innan den bygger en ny vy och använder bara SJ:s komponenter.

## Om något fallerar

Skriv ned vad som hände i `feedback-till-mallen.md`: steget, vad du såg och VS Code- och Copilot-versionen (*Help → About* och tilläggets sida). Vanliga orsaker:

- **Skills syns inte:** finns `.github/skills/`? Kör `npm run skills:sync` och starta om chatten.
- **MCP-servrarna syns inte:** kör *MCP: List Servers* i kommandopaletten och starta dem därifrån.
- **`.omstart.md` lästes inte:** agenten har inte läst punkt 0 i AGENTS.md. Kolla att `.github/copilot-instructions.md` finns.
