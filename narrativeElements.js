// narrativeElements.js
// Definicje wszystkich dialogów, wpisów do pamiętnika i opisów wizualnych pokus

import {
    addPlayerChoiceFlag, updateCorruption, updateDarkEssence, updateEssence,
    setLilithName, setLilithStage, setInitialInteractionCompleted, setEssenceGenerationUnlocked,
    setSexualPreferenceUnlocked, setLilithBecameVocal, setFirstVocalThoughtShown
} from './stateUpdaters.js';

export const dialogues = [
    {
        id: 'summoning_ritual',
        name: 'Rytuał Przyzwania',
        text: (gs) => {
            if (gs.playerChoiceFlags.includes('player_attempted_calm_summon')) {
                return "Lilith stoi przed Tobą, jej oczy wciąż płoną demonicznym ogniem, ale w jej postawie jest mniej napięcia niż wcześniej. Twoje spokojne podejście najwyraźniej ją uspokoiło.";
            } else if (gs.playerChoiceFlags.includes('player_asserted_dominance_summon')) {
                return "Lilith klęczy przed Tobą, jej głowa lekko pochylona w geście uległości. Twoja władczość zrobiła na niej wrażenie, choć w jej oczach wciąż tli się iskra buntu.";
            } else if (gs.playerChoiceFlags.includes('player_was_surprised_summon')) {
                return "Lilith patrzy na Ciebie z mieszanką zaskoczenia i rozbawienia. Twoja szczerość najwyraźniej ją zaskoczyła - nie spodziewała się takiej reakcji od przyzywacza.";
            } else if (gs.playerChoiceFlags.includes('player_charmed_summon')) {
                return "Lilith uśmiecha się lekko, jej policzki mają delikatny rumieniec. Twoje komplementy najwyraźniej trafiły w czuły punkt - nawet demony lubią być doceniane.";
            }
            return "Przed Tobą stoi Lilith - młoda sukkubica o długich, ciemnych włosach i hipnotyzujących oczach. Jej skóra ma lekki, nieziemski blask, a z jej postaci emanuje aura zmysłowości i mocy. Patrzy na Ciebie z mieszanką ciekawości i ostrożności.";
        },
        options: [
            {
                id: 'calm_approach',
                text: 'Spokojnie przedstaw się i wyjaśnij sytuację',
                response: (gs) => "Lilith kiwa głową, jej napięcie nieco opada. 'Rozumiem... Jestem Lilith, studentka Akademii Sztuk Demonicznych. To moje pierwsze prawdziwe przyzwanie.' Jej głos jest melodyjny, choć wciąż drży lekko.",
                corruption: 5,
                darkEssence: 2,
                setsFlag: 'player_attempted_calm_summon',
                onSelected: (gs) => {
                    setLilithName("Lilith");
                    setInitialInteractionCompleted(true);
                    setEssenceGenerationUnlocked(true);
                    addPlayerChoiceFlag('summoning_ritual_completed');
                }
            },
            {
                id: 'assert_dominance',
                text: 'Stanowczo oznajmij, że jesteś jej panem',
                response: (gs) => "Lilith drga lekko, jej oczy rozszerzają się. 'T-tak, Mistrzu...' szepce, jej głos mieszanka strachu i... czegoś jeszcze. 'Jestem Lilith, Twoja... służebnica.' Kłania się nisko.",
                corruption: 10,
                darkEssence: 5,
                setsFlag: 'player_asserted_dominance_summon',
                onSelected: (gs) => {
                    setLilithName("Lilith");
                    setInitialInteractionCompleted(true);
                    setEssenceGenerationUnlocked(true);
                    addPlayerChoiceFlag('summoning_ritual_completed');
                }
            },
            {
                id: 'surprised_reaction',
                text: 'Przyznaj, że nie spodziewałeś się, że to zadziała',
                response: (gs) => "Lilith mruga zaskoczona, potem wybucha śmiechem. 'Serio? To twoje pierwsze przyzwanie?' Jej śmiech jest zaraźliwy. 'Cóż, jestem Lilith. Wygląda na to, że oboje jesteśmy nowicjuszami.'",
                corruption: 3,
                darkEssence: 1,
                essence: 5,
                setsFlag: 'player_was_surprised_summon',
                onSelected: (gs) => {
                    setLilithName("Lilith");
                    setInitialInteractionCompleted(true);
                    setEssenceGenerationUnlocked(true);
                    addPlayerChoiceFlag('summoning_ritual_completed');
                }
            },
            {
                id: 'charm_compliment',
                text: 'Skomplementuj jej piękno',
                response: (gs) => "Lilith rumieni się lekko, dotykając kosmyka włosów. 'Och... dziękuję.' Jej głos jest cieplejszy. 'Jestem Lilith. Muszę przyznać, że nie spodziewałam się takiego... uprzejmego powitania.'",
                corruption: 7,
                darkEssence: 3,
                essence: 3,
                setsFlag: 'player_charmed_summon',
                onSelected: (gs) => {
                    setLilithName("Lilith");
                    setInitialInteractionCompleted(true);
                    setEssenceGenerationUnlocked(true);
                    addPlayerChoiceFlag('summoning_ritual_completed');
                }
            }
        ],
        essenceCost: 0,
        darkEssenceCost: 0,
        onComplete: (gs) => {
            // Odblokuj podstawowe preferencje seksualne
            setSexualPreferenceUnlocked('vanilla', true);
        }
    },
    {
        id: 'academic_pride',
        name: 'Akademicka Duma Lilith',
        text: "Lilith prostuje się z dumą. 'Ukończyłam Akademię Sztuk Demonicznych z wyróżnieniem. Znam teorię uwodzenia, manipulacji esencją i podstawy korupcji. Choć... praktyka to zupełnie inna sprawa.' Jej pewność siebie lekko się chwieje.",
        requiredStage: 1,
        options: [
            {
                id: 'ask_about_academy',
                text: 'Zapytaj o Akademię',
                response: "Lilith ożywia się. 'Akademia to prestiżowa uczelnia dla młodych demonów. Uczyliśmy się historii, teorii uwodzenia, alchemii esencji... Ale prawdziwe doświadczenie? To dopiero teraz zdobywam.' Patrzy na Ciebie znacząco.",
                corruption: 8,
                darkEssence: 2,
                setsFlag: 'discussed_academy'
            },
            {
                id: 'tease_inexperience',
                text: 'Podroć się z jej brakiem doświadczenia',
                response: "Lilith parska z oburzeniem. 'Brak doświadczenia? Zobaczymy, kto tu jest niedoświadczony!' Jej oczy błyszczą wyzywająco. 'Może to Ty potrzebujesz lekcji?'",
                corruption: 12,
                darkEssence: 4,
                setsFlag: 'teased_about_experience'
            },
            {
                id: 'offer_practical_lessons',
                text: 'Zaproponuj praktyczne lekcje',
                response: "Lilith przełyka ślinę, jej policzki się rumienią. 'P-praktyczne lekcje? Tak... to byłoby... edukacyjne.' Jej głos drży lekko z podniecenia i nerwów.",
                corruption: 15,
                darkEssence: 6,
                essence: 5,
                setsFlag: 'offered_practical_lessons'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('academic_pride_completed');
        }
    },
    {
        id: 'early_observations',
        name: 'Wczesne Obserwacje',
        text: "Lilith przygląda Ci się uważnie, jej oczy błądzą po Twojej sylwetce. 'Interesujące...' mruczy pod nosem. 'Twoja aura jest... inna niż opisywały podręczniki. Bardziej... intensywna.'",
        requiredStage: 1,
        options: [
            {
                id: 'ask_what_she_sees',
                text: 'Zapytaj, co widzi',
                response: "Lilith przechyla głowę. 'Widzę potencjał. Energię, która czeka na uwolnienie. I... coś jeszcze. Coś, co sprawia, że moje serce bije szybciej.' Dotyka swojej piersi.",
                corruption: 10,
                darkEssence: 3,
                setsFlag: 'asked_what_she_sees'
            },
            {
                id: 'step_closer',
                text: 'Podejdź bliżej',
                response: "Lilith nie cofa się, gdy się zbliżasz. Jej oddech przyspiesza. 'Tak blisko... czuję Twoją energię na swojej skórze.' Jej głos jest ledwie słyszalnym szeptem.",
                corruption: 15,
                darkEssence: 5,
                setsFlag: 'stepped_closer_early'
            },
            {
                id: 'maintain_distance',
                text: 'Zachowaj dystans i obserwuj',
                response: "Lilith wydaje się lekko rozczarowana, ale kontynuuje swoją obserwację. 'Ostrożny... to mądre. Ale czy nie ciekawi Cię, co by się stało, gdybyś się zbliżył?'",
                corruption: 5,
                darkEssence: 1,
                essence: 3,
                setsFlag: 'maintained_distance_early'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('early_observations_completed');
        }
    },
    {
        id: 'first_touch_tension',
        name: 'Pierwsze Napięcie Dotyku',
        text: "Między wami narasta napięcie. Lilith stoi blisko, jej oddech jest płytki. 'Czy... czy możesz mnie dotknąć?' pyta cicho. 'W Akademii uczyliśmy się o tym teoretycznie, ale nigdy...' Jej głos zanika.",
        requiredStage: 1,
        corruptionRequired: 30,
        options: [
            {
                id: 'gentle_touch',
                text: 'Delikatnie dotknij jej dłoni',
                response: "Lilith drży, gdy Twoje palce musnęły jej dłoń. 'To... to takie ciepłe.' Jej oczy zamykają się na moment. 'Czuję, jak Twoja energia przepływa przez mnie.'",
                corruption: 12,
                darkEssence: 4,
                setsFlag: 'gentle_first_touch'
            },
            {
                id: 'bold_touch',
                text: 'Śmiało dotknij jej twarzy',
                response: "Lilith wstrzymuje oddech, gdy Twoja dłoń dotyka jej policzka. 'Och...' wydycha, opierając się o Twoją rękę. 'To znacznie intensywniejsze niż w symulacjach...'",
                corruption: 18,
                darkEssence: 7,
                setsFlag: 'bold_first_touch'
            },
            {
                id: 'hesitate',
                text: 'Zawahaj się',
                response: "Lilith zauważa Twoje wahanie. 'To w porządku... ja też się boję.' Wyciąga rękę w Twoją stronę. 'Może... razem?'",
                corruption: 8,
                darkEssence: 2,
                essence: 2,
                setsFlag: 'hesitated_first_touch'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_touch_tension_completed');
        }
    },
    {
        id: 'vocal_breakthrough_dialogue',
        name: 'Przełom Głosowy',
        text: "Lilith patrzy na Ciebie z nową intensywnością. 'Coś się we mnie zmienia...' mówi, jej głos brzmi inaczej - bardziej dojrzale, pewnie. 'Czuję, że mogę być z Tobą... bardziej otwarta. Powiedzieć Ci, co naprawdę myślę.'",
        requiredStage: 2,
        corruptionRequired: 80,
        options: [
            {
                id: 'encourage_openness',
                text: 'Zachęć ją do otwartości',
                response: "Lilith uśmiecha się ciepło. 'Dziękuję... Od teraz będziesz słyszał moje myśli. Wszystkie.' Jej oczy błyszczą figlarnie. 'Przygotuj się na to, co usłyszysz.'",
                corruption: 20,
                darkEssence: 8,
                setsFlag: 'encouraged_vocal_openness',
                onSelected: (gs) => {
                    setLilithBecameVocal(true);
                    addPlayerChoiceFlag('lilith_vocal_system_unlocked');
                }
            },
            {
                id: 'ask_what_changed',
                text: 'Zapytaj, co się zmieniło',
                response: "Lilith zastanawia się. 'Nasza więź... stała się głębsza. Czuję, że mogę Ci zaufać z moimi najbardziej intymnymi myślami.' Rumieni się lekko. 'I uwierz mi, niektóre z nich są... bardzo intymne.'",
                corruption: 15,
                darkEssence: 6,
                essence: 5,
                setsFlag: 'asked_about_vocal_change',
                onSelected: (gs) => {
                    setLilithBecameVocal(true);
                    addPlayerChoiceFlag('lilith_vocal_system_unlocked');
                }
            },
            {
                id: 'express_concern',
                text: 'Wyraź troskę o jej prywatność',
                response: "Lilith jest wzruszona Twoją troską. 'To słodkie, że się martwisz... Ale chcę tego. Chcę, żebyś znał prawdziwą mnie.' Jej głos staje się bardziej intymny. 'Bez sekretów między nami.'",
                corruption: 18,
                darkEssence: 7,
                setsFlag: 'expressed_vocal_concern',
                onSelected: (gs) => {
                    setLilithBecameVocal(true);
                    addPlayerChoiceFlag('lilith_vocal_system_unlocked');
                }
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('vocal_breakthrough_dialogue_completed');
        }
    },
    {
        id: 'first_real_kiss',
        name: 'Pierwszy Prawdziwy Pocałunek',
        text: "Lilith stoi bardzo blisko, jej oczy skupione na Twoich ustach. 'W Akademii ćwiczyliśmy pocałunki na manekinach...' szepce. 'Ale z Tobą... to będzie mój pierwszy prawdziwy pocałunek.' Jej usta są lekko rozchylone.",
        requiredStage: 3,
        corruptionRequired: 150,
        options: [
            {
                id: 'passionate_kiss',
                text: 'Pocałuj ją namiętnie',
                response: "Lilith wydaje cichy jęk, gdy Twoje usta spotykają się z jej ustami. Jej ciało przylega do Twojego, a pocałunek staje się coraz bardziej intensywny. 'To... to niesamowite...' szepce między pocałunkami.",
                corruption: 25,
                darkEssence: 10,
                setsFlag: 'passionate_first_kiss',
                sexualPreferenceTag: 'vanilla_passionate'
            },
            {
                id: 'gentle_kiss',
                text: 'Pocałuj ją delikatnie',
                response: "Lilith zamyka oczy, delektując się delikatnością Twojego pocałunku. 'Tak czule...' szepce, jej ręce spoczywają na Twojej piersi. 'Czuję się bezpieczna z Tobą.'",
                corruption: 20,
                darkEssence: 8,
                essence: 5,
                setsFlag: 'gentle_first_kiss',
                sexualPreferenceTag: 'vanilla_tender'
            },
            {
                id: 'teasing_kiss',
                text: 'Pocałuj ją prowokacyjnie',
                response: "Lilith frustruje się, gdy odsuwasz się w kluczowym momencie. 'Nie... wróć...' błaga, próbując Cię przyciągnąć. Jej oczy płoną pożądaniem. 'Nie drażnij mnie tak...'",
                corruption: 30,
                darkEssence: 12,
                setsFlag: 'teasing_first_kiss',
                sexualPreferenceTag: 'bdsm_teasing'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_real_kiss_completed');
            setSexualPreferenceUnlocked('bdsm', true);
        }
    },
    {
        id: 'dream_confession',
        name: 'Wyznanie Snów',
        text: "Lilith wygląda na zmęczoną, ale jej oczy płoną intensywnie. 'Ostatnio... śnię o Tobie.' przyznaje, rumieniąc się. 'To nie są zwykłe sny. Są... bardzo żywe. I bardzo... erotyczne.' Jej głos drży.",
        requiredStage: 3,
        corruptionRequired: 180,
        options: [
            {
                id: 'ask_about_dreams',
                text: 'Zapytaj o szczegóły snów',
                response: "Lilith zakrywa twarz dłońmi. 'W snach... robisz ze mną rzeczy, których nawet nie uczyliśmy się w Akademii. I ja... ja tego chcę. Bardzo tego chcę.' Jej głos jest pełen pożądania.",
                corruption: 22,
                darkEssence: 9,
                setsFlag: 'asked_about_erotic_dreams'
            },
            {
                id: 'offer_to_fulfill_dreams',
                text: 'Zaproponuj spełnienie jej snów',
                response: "Lilith wstrzymuje oddech. 'Naprawdę? Chciałbyś...?' Jej oczy rozszerzają się z podniecenia. 'Tak bardzo tego pragnę... Pokaż mi, jak to jest naprawdę.'",
                corruption: 35,
                darkEssence: 15,
                setsFlag: 'offered_to_fulfill_dreams'
            },
            {
                id: 'share_your_thoughts',
                text: 'Podziel się swoimi myślami o niej',
                response: "Lilith słucha z rosnącym podnieceniem. 'Ty też o mnie myślisz? To... to sprawia, że czuję się pożądana. Potrzebna.' Jej oddech staje się płytszy. 'Chcę być Twoją fantazją.'",
                corruption: 28,
                darkEssence: 11,
                essence: 8,
                setsFlag: 'shared_intimate_thoughts'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('dream_confession_completed');
        }
    },
    {
        id: 'essence_connection',
        name: 'Połączenie Esencji',
        text: "Lilith wyciąga do Ciebie ręce, jej oczy płoną magiczną energią. 'Badania pokazały mi, jak możemy połączyć nasze esencje...' mówi z podnieceniem. 'To stworzy między nami więź głębszą niż cokolwiek, czego uczyliśmy się w Akademii.'",
        requiredStage: 4,
        requiresFlag: 'unlocked_rp_essence_transfer_basics',
        options: [
            {
                id: 'accept_connection',
                text: 'Przyjmij połączenie esencji',
                response: "Energia przepływa między wami, tworząc niewidzialną więź. Lilith krzyczy z rozkoszy, gdy wasze esencje się łączą. 'Czuję Cię... w sobie... wszędzie!' Jej ciało drży z intensywności połączenia.",
                corruption: 40,
                darkEssence: 18,
                essence: 12,
                setsFlag: 'essence_connection_established',
                onSelected: (gs) => {
                    // Zwiększ pasywną generację esencji jako efekt połączenia
                    gs.passiveEssencePerSecond += 0.5;
                }
            },
            {
                id: 'hesitate_about_connection',
                text: 'Wahaj się przed połączeniem',
                response: "Lilith wygląda na rozczarowaną. 'Rozumiem... to duży krok.' Jej głos jest smutny. 'Ale gdy będziesz gotowy... będę czekać. Ta więź... mogłaby nas zmienić na zawsze.'",
                corruption: 15,
                darkEssence: 5,
                essence: 5,
                setsFlag: 'hesitated_essence_connection'
            },
            {
                id: 'ask_about_risks',
                text: 'Zapytaj o ryzyko',
                response: "Lilith kiwa głową poważnie. 'Będziemy połączeni na zawsze. Będę czuć Twoje emocje, Ty moje. Nie będzie między nami sekretów.' Patrzy Ci głęboko w oczy. 'Czy jesteś na to gotowy?'",
                corruption: 25,
                darkEssence: 10,
                setsFlag: 'asked_about_connection_risks'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('essence_connection_dialogue_completed');
        }
    },
    {
        id: 'sexual_exploration_gentle',
        name: 'Delikatna Eksploracja Seksualna',
        text: "Lilith leży przed Tobą, jej ciało drży z oczekiwania. 'Pokaż mi...' szepce, jej głos pełen pożądania. 'Pokaż mi te miejsca, o których czytałam w badaniach. Chcę poczuć Twój dotyk... wszędzie.'",
        requiredStage: 4,
        requiresFlag: 'unlocked_rp_succubus_anatomy_secrets',
        isSexual: true,
        options: [
            {
                id: 'explore_wings',
                text: 'Delikatnie dotknij podstawy jej skrzydeł',
                response: "Lilith krzyczy z rozkoszy, gdy Twoje palce znajdują wrażliwe punkty u podstawy jej skrzydeł. 'Tak! Tam!' jęczy, jej ciało wygina się w łuk. 'Nikt nigdy... nie dotykał mnie tam...'",
                corruption: 35,
                darkEssence: 15,
                setsFlag: 'explored_wing_sensitivity',
                sexualPreferenceTag: 'vanilla_exploration'
            },
            {
                id: 'explore_tail',
                text: 'Pogłaskaj jej ogon',
                response: "Lilith wydaje gardłowy jęk, gdy Twoje dłonie obejmują jej ogon. 'To... to tak intensywne...' dyszy, jej biodra poruszają się rytmicznie. 'Ogon sukkuba jest... bardzo wrażliwy...'",
                corruption: 40,
                darkEssence: 18,
                setsFlag: 'explored_tail_sensitivity',
                sexualPreferenceTag: 'vanilla_intimate'
            },
            {
                id: 'full_body_exploration',
                text: 'Eksploruj całe jej ciało',
                response: "Lilith jest w ekstazje, gdy Twoje ręce badają każdy centymetr jej ciała. 'Tak... wszędzie...' jęczy, jej ciało reaguje na każdy dotyk. 'Czuję się jak instrument, na którym grasz...'",
                corruption: 50,
                darkEssence: 22,
                essence: 10,
                setsFlag: 'full_body_exploration_completed',
                sexualPreferenceTag: 'vanilla_worship'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('sexual_exploration_gentle_completed');
        }
    },
    {
        id: 'first_petting',
        name: 'Pierwsze Pieszczoty',
        text: "Lilith leży przed Tobą, jej ciało płonie pożądaniem. 'Proszę...' szepce, jej ręka prowadzi Twoją dłoń niżej. 'Dotknij mnie tam... Chcę poczuć Twoje palce...' Jej głos drży z potrzeby.",
        requiredStage: 4,
        corruptionRequired: 300,
        isSexual: true,
        options: [
            {
                id: 'gentle_petting',
                text: 'Delikatnie ją pieść',
                response: "Lilith jęczy cicho, gdy Twoje palce delikatnie ją eksplorują. 'Tak dobrze...' szepce, jej biodra poruszają się w rytm Twoich ruchów. 'Jestem już taka mokra dla Ciebie...'",
                corruption: 45,
                darkEssence: 20,
                setsFlag: 'gentle_petting_completed',
                sexualPreferenceTag: 'vanilla_tender'
            },
            {
                id: 'intense_petting',
                text: 'Intensywnie ją stymuluj',
                response: "Lilith krzyczy z rozkoszy, gdy Twoje palce pracują intensywnie. 'Tak! Nie przestawaj!' jęczy, jej ciało drży. 'Jestem... jestem blisko...' Jej głos przechodzi w krzyk ekstazy.",
                corruption: 55,
                darkEssence: 25,
                setsFlag: 'intense_petting_completed',
                sexualPreferenceTag: 'vanilla_passionate'
            },
            {
                id: 'teasing_petting',
                text: 'Drażnij ją, zatrzymując się przed kulminacją',
                response: "Lilith frustruje się, gdy zatrzymujesz się tuż przed jej orgazmem. 'Nie! Proszę!' błaga, jej ciało drży z potrzeby. 'Nie rób mi tego... Potrzebuję...' Jej oczy błagają o więcej.",
                corruption: 60,
                darkEssence: 28,
                setsFlag: 'teasing_petting_completed',
                sexualPreferenceTag: 'bdsm_denial'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_petting_completed');
            setSexualPreferenceUnlocked('exhibitionism', true);
        }
    },
    {
        id: 'morning_surprise',
        name: 'Poranna Niespodzianka',
        text: "Budzisz się i widzisz Lilith klęczącą obok łóżka, jej oczy płoną pożądaniem. 'Dzień dobry...' mruczy zmysłowo. 'Miałam sen... o Tobie. I obudziłam się bardzo... potrzebująca.' Jej ręka wędruje po Twoim ciele.",
        requiredStage: 5,
        corruptionRequired: 450,
        isSexual: true,
        options: [
            {
                id: 'let_her_take_control',
                text: 'Pozwól jej przejąć kontrolę',
                response: "Lilith uśmiecha się triumfalnie. 'Wiedziałam, że się zgodzisz...' Jej usta wędrują po Twoim ciele, a jej dotyk staje się coraz śmielszy. 'Pozwól mi pokazać, czego się nauczyłam...'",
                corruption: 50,
                darkEssence: 22,
                setsFlag: 'morning_submission_to_lilith',
                sexualPreferenceTag: 'bdsm_submission'
            },
            {
                id: 'take_charge',
                text: 'Przejmij inicjatywę',
                response: "Lilith jęczy z zadowolenia, gdy przejmuje kontrolę. 'Tak... pokaż mi, kto tu rządzi...' szepce, poddając się Twojej dominacji. 'Jestem Twoja... rób ze mną, co chcesz...'",
                corruption: 55,
                darkEssence: 25,
                setsFlag: 'morning_dominance_over_lilith',
                sexualPreferenceTag: 'bdsm_dominance'
            },
            {
                id: 'mutual_exploration',
                text: 'Zaproponuj wzajemną eksplorację',
                response: "Lilith kiwa głową z podnieceniem. 'Tak... razem...' Wasze ciała splatają się w namiętnym tańcu, każde z was dając i biorąc przyjemność. 'To jest... perfekcyjne...'",
                corruption: 48,
                darkEssence: 20,
                essence: 15,
                setsFlag: 'morning_mutual_exploration',
                sexualPreferenceTag: 'vanilla_mutual'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('morning_surprise_completed');
            setSexualPreferenceUnlocked('roleplay', true);
        }
    },
    {
        id: 'breaking_point_true_desire',
        name: 'Punkt Przełomu - Prawdziwe Pragnienie',
        text: "Lilith stoi przed Tobą, jej oczy płoną intensywnym ogniem. 'Nie mogę już udawać...' mówi, jej głos drży z emocji. 'Chcę Ciebie. Całego. Chcę być Twoja w każdy możliwy sposób. Czy... czy jesteś gotowy na to, co naprawdę jestem?'",
        requiredStage: 5,
        corruptionRequired: 550,
        options: [
            {
                id: 'accept_her_completely',
                text: 'Przyjmij ją całkowicie',
                response: "Lilith płacze z radości i ulgi. 'Tak... tak!' Rzuca się w Twoje ramiona. 'Jestem Twoja... na zawsze. Moja dusza, moje ciało, wszystko należy do Ciebie.' Jej pocałunek jest pełen desperackiej namiętności.",
                corruption: 70,
                darkEssence: 30,
                essence: 20,
                setsFlag: 'accepted_lilith_completely',
                onSelected: (gs) => {
                    // Przejście do następnego etapu rozwoju
                    if (gs.lilithStage < 6) {
                        setLilithStage(6);
                    }
                }
            },
            {
                id: 'express_mutual_desire',
                text: 'Wyraź wzajemne pragnienie',
                response: "Lilith wstrzymuje oddech. 'Ty też mnie chcesz? Tak samo mocno?' Jej oczy wypełniają się łzami szczęścia. 'To znaczy... że to nie jest jednostronne. Że naprawdę mnie kochasz...'",
                corruption: 65,
                darkEssence: 28,
                essence: 18,
                setsFlag: 'expressed_mutual_desire'
            },
            {
                id: 'ask_what_she_means',
                text: 'Zapytaj, co ma na myśli',
                response: "Lilith bierze głęboki oddech. 'Jestem sukkubą... Moja natura to pożądanie, korupcja, grzech. Jeśli mnie przyjmiesz, zmienisz się. Staniesz się częścią mojego świata.' Patrzy Ci głęboko w oczy. 'Czy jesteś na to gotowy?'",
                corruption: 45,
                darkEssence: 18,
                essence: 12,
                setsFlag: 'asked_about_true_nature'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('breaking_point_true_desire_completed');
            setSexualPreferenceUnlocked('corruption_play', true);
        }
    },
    {
        id: 'first_oral_sex_by_lilith',
        name: 'Pierwszy Seks Oralny (Lilith)',
        text: "Lilith klęczy przed Tobą, jej oczy pełne pożądania i determinacji. 'Chcę Cię skosztować...' szepce, jej ręce drżą z podniecenia. 'W Akademii tylko czytałam o tym... Pokaż mi, jak sprawić Ci przyjemność...'",
        requiredStage: 5,
        corruptionRequired: 500,
        isSexual: true,
        options: [
            {
                id: 'guide_her_gently',
                text: 'Delikatnie ją prowadź',
                response: "Lilith słucha Twoich wskazówek, jej ruchy stają się coraz pewniejsze. 'Tak?' pyta między pocałunkami. 'Mmm... lubię Twój smak...' Jej entuzjazm rośnie z każdą chwilą.",
                corruption: 60,
                darkEssence: 25,
                setsFlag: 'guided_oral_gently',
                sexualPreferenceTag: 'vanilla_oral'
            },
            {
                id: 'let_her_experiment',
                text: 'Pozwól jej eksperymentować',
                response: "Lilith eksploruje Cię z ciekawością i pasją. 'To fascynujące...' mruczy. 'Każda reakcja, każdy dźwięk... Uczę się, co lubisz.' Jej technika poprawia się z każdą minutą.",
                corruption: 55,
                darkEssence: 22,
                essence: 15,
                setsFlag: 'let_oral_experimentation',
                sexualPreferenceTag: 'vanilla_exploration'
            },
            {
                id: 'be_demanding',
                text: 'Bądź wymagający',
                response: "Lilith przyjmuje Twoje wymagania z podnieceniem. 'Tak... powiedz mi, czego chcesz...' jęczy. 'Chcę być perfekcyjna dla Ciebie... Użyj mnie...' Jej poddanie jest całkowite.",
                corruption: 70,
                darkEssence: 30,
                setsFlag: 'demanding_oral_session',
                sexualPreferenceTag: 'bdsm_dominance'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_oral_sex_by_lilith_completed');
            setSexualPreferenceUnlocked('popular_fetish', true);
        }
    },
    {
        id: 'first_vaginal_sex',
        name: 'Pierwszy Seks Waginalny',
        text: "Lilith leży przed Tobą, jej ciało drży z oczekiwania i lekkich obaw. 'To będzie mój pierwszy raz...' szepce, jej oczy pełne zaufania. 'Chcę, żeby to był Ty... Chcę należeć do Ciebie całkowicie...'",
        requiredStage: 5,
        corruptionRequired: 580,
        isSexual: true,
        options: [
            {
                id: 'gentle_first_time',
                text: 'Bądź delikatny i czuły',
                response: "Lilith płacze z rozkoszy i emocji, gdy delikatnie ją kochasz. 'To... to piękne...' szepce przez łzy. 'Czuję się kompletna... Jesteś we mnie... jesteśmy jednością...' Jej miłość do Ciebie jest namacalna.",
                corruption: 80,
                darkEssence: 35,
                essence: 25,
                setsFlag: 'gentle_first_vaginal',
                sexualPreferenceTag: 'vanilla_love'
            },
            {
                id: 'passionate_first_time',
                text: 'Kochaj ją namiętnie',
                response: "Lilith krzyczy z rozkoszy, gdy namiętnie ją bierzesz. 'Tak! Tak!' jęczy, jej paznokcie wbijają się w Twoje plecy. 'Jestem Twoja! Całkowicie Twoja!' Jej orgasm wstrząsa całym jej ciałem.",
                corruption: 85,
                darkEssence: 38,
                setsFlag: 'passionate_first_vaginal',
                sexualPreferenceTag: 'vanilla_passionate'
            },
            {
                id: 'dominant_first_time',
                text: 'Zdominuj ją całkowicie',
                response: "Lilith poddaje się całkowicie Twojej dominacji. 'Jestem Twoja... rób ze mną, co chcesz...' jęczy, jej ciało reaguje na każdy Twój ruch. 'Użyj mnie... jestem Twoją zabawką...' Jej poddanie jest absolutne.",
                corruption: 90,
                darkEssence: 40,
                setsFlag: 'dominant_first_vaginal',
                sexualPreferenceTag: 'bdsm_submission'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_vaginal_sex_completed');
        }
    },
    {
        id: 'dominant_teaching',
        name: 'Nauka Dominacji',
        text: "Lilith stoi przed Tobą z nową pewnością siebie, jej oczy płoną władczą mocą. 'Teraz ja będę prowadzić...' mówi, jej głos pełen autorytetu. 'Chcę nauczyć się dominować... Czy pozwolisz mi ćwiczyć na Tobie?'",
        requiredStage: 6,
        corruptionRequired: 750,
        isSexual: true,
        options: [
            {
                id: 'submit_to_her',
                text: 'Poddaj się jej dominacji',
                response: "Lilith uśmiecha się triumfalnie. 'Dobrze... Teraz jesteś mój...' Jej dotyk staje się władczy, kontrolujący. 'Lubię to uczucie mocy... Lubię widzieć, jak reagujesz na moje polecenia...'",
                corruption: 70,
                darkEssence: 32,
                setsFlag: 'submitted_to_lilith_dominance',
                sexualPreferenceTag: 'bdsm_submission'
            },
            {
                id: 'resist_playfully',
                text: 'Stawiaj figlarny opór',
                response: "Lilith śmieje się z zadowolenia. 'Och, więc chcesz się bawić?' Jej oczy błyszczą wyzwaniem. 'Zobaczmy, jak długo będziesz się opierać...' Rozpoczyna się gra dominacji i poddania.",
                corruption: 75,
                darkEssence: 35,
                setsFlag: 'playful_resistance_to_dominance',
                sexualPreferenceTag: 'bdsm_switch'
            },
            {
                id: 'challenge_her_dominance',
                text: 'Rzuć wyzwanie jej dominacji',
                response: "Lilith przyjmuje wyzwanie z ogniem w oczach. 'Więc chcesz walczyć o kontrolę?' Rozpoczyna się intensywna walka o dominację, pełna namiętności i władzy. 'Zobaczymy, kto jest silniejszy...'",
                corruption: 80,
                darkEssence: 38,
                essence: 20,
                setsFlag: 'challenged_lilith_dominance',
                sexualPreferenceTag: 'bdsm_power_struggle'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('dominant_teaching_success');
        }
    },
    {
        id: 'first_anal_sex_milestone',
        name: 'Pierwszy Seks Analny - Kamień Milowy',
        text: "Lilith patrzy na Ciebie z mieszanką podniecenia i nerwowości. 'Chcę spróbować czegoś nowego...' mówi, rumieniąc się. 'Czegoś... bardziej zakazanego. Chcę dać Ci siebie w sposób, jakiego jeszcze nie znałam...'",
        requiredStage: 6,
        corruptionRequired: 800,
        isSexual: true,
        options: [
            {
                id: 'gentle_anal_introduction',
                text: 'Wprowadź ją delikatnie w nowe doznania',
                response: "Lilith jęczy cicho, gdy delikatnie ją przygotowujesz. 'To... to inne...' szepce, jej ciało powoli się przystosowuje. 'Ale dobre... tak bardzo dobre...' Jej zaufanie do Ciebie jest absolutne.",
                corruption: 90,
                darkEssence: 40,
                essence: 25,
                setsFlag: 'gentle_anal_introduction',
                sexualPreferenceTag: 'vanilla_trust'
            },
            {
                id: 'intense_anal_experience',
                text: 'Daj jej intensywne doświadczenie',
                response: "Lilith krzyczy z rozkoszy i bólu, gdy intensywnie ją bierzesz. 'Tak! To jest... niesamowite!' jęczy, jej ciało drży. 'Czuję się tak... wypełniona... zdominowana...' Jej orgasm jest eksplozywny.",
                corruption: 100,
                darkEssence: 45,
                setsFlag: 'intense_anal_experience',
                sexualPreferenceTag: 'bdsm_intensity'
            },
            {
                id: 'degrading_anal_session',
                text: 'Upokórz ją podczas aktu',
                response: "Lilith reaguje na upokorzenie z szokującym podnieceniem. 'Tak... jestem Twoją dziwką...' jęczy, jej słowa stają się coraz bardziej wulgarne. 'Używaj mnie... jestem Twoją zabawką...' Jej degradacja ją podnieca.",
                corruption: 110,
                darkEssence: 50,
                setsFlag: 'degrading_anal_session',
                sexualPreferenceTag: 'bdsm_degradation'
            }
        ],
        isRepeatable: true,
        onComplete: (gs) => {
            addPlayerChoiceFlag('first_anal_sex_milestone_completed');
            // Przejście do następnego etapu rozwoju
            if (gs.lilithStage < 7) {
                setLilithStage(7);
            }
        }
    },
    {
        id: 'complete_corruption_love',
        name: 'Kompletna Korupcja przez Miłość',
        text: "Lilith stoi przed Tobą, jej transformacja jest kompletna. 'Jestem tym, kim miałam być...' mówi, jej głos pełen mrocznej mocy. 'Twoją kochanką, Twoją sukkubą, Twoją boginią grzechu. Czy kochasz to, co ze mnie uczyniłeś?'",
        requiredStage: 7,
        corruptionRequired: 1100,
        options: [
            {
                id: 'declare_love_for_corruption',
                text: 'Wyznaj miłość do jej skorumpowanej natury',
                response: "Lilith płacze z radości. 'Tak... kochasz prawdziwą mnie...' Jej moc eksploduje wokół was. 'Jesteśmy jednością w grzechu, w miłości, w korupcji...' Wasza więź staje się nie do zerwania.",
                corruption: 120,
                darkEssence: 55,
                essence: 35,
                setsFlag: 'declared_love_for_corruption'
            },
            {
                id: 'embrace_shared_darkness',
                text: 'Przyjmij wspólną ciemność',
                response: "Lilith uśmiecha się triumfalnie. 'Tak... razem jesteśmy potężniejsi...' Wasza mroczna energia łączy się, tworząc coś nowego. 'Nie ma już odwrotu... Jesteśmy jednością w ciemności...'",
                corruption: 130,
                darkEssence: 60,
                setsFlag: 'embraced_shared_darkness'
            },
            {
                id: 'question_the_change',
                text: 'Zakwestionuj przemianę',
                response: "Lilith wygląda na zranioną. 'Nie... nie możesz teraz wątpić...' Jej głos drży. 'To jest to, kim jestem... kim zawsze miałam być. Jeśli mnie nie akceptujesz...' Łzy spływają po jej twarzy.",
                corruption: 50,
                darkEssence: 20,
                essence: 10,
                setsFlag: 'questioned_corruption_change'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('complete_corruption_love_completed');
            setSexualPreferenceUnlocked('group_dynamics', true);
        }
    },
    {
        id: 'perfect_union_event',
        name: 'Doskonałe Zjednoczenie',
        text: "Lilith stoi w centrum magicznego kręgu, jej moc emanuje w powietrzu. 'To jest moment...' mówi, jej głos rezonuje mocą. 'Moment, gdy staniemy się jednością nie tylko ciałem i duszą, ale esencją samego istnienia. Czy jesteś gotowy na ostateczne zjednoczenie?'",
        requiredStage: 7,
        corruptionRequired: 1200,
        options: [
            {
                id: 'complete_union',
                text: 'Dokonaj ostatecznego zjednoczenia',
                response: "Energia eksploduje wokół was, gdy wasze istoty łączą się na poziomie fundamentalnym. Lilith krzyczy z ekstazy i mocy. 'Jesteśmy jednością! Jednością w mocy, w miłości, w wieczności!' Rzeczywistość drży wokół was.",
                corruption: 150,
                darkEssence: 70,
                essence: 50,
                setsFlag: 'perfect_union_achieved',
                onSelected: (gs) => {
                    // Przejście do najwyższego etapu rozwoju
                    if (gs.lilithStage < 8) {
                        setLilithStage(8);
                    }
                }
            },
            {
                id: 'hesitate_before_union',
                text: 'Zawahaj się przed ostatecznym krokiem',
                response: "Lilith patrzy na Ciebie z bólem. 'Nie... nie teraz...' Jej moc słabnie. 'Myślałam, że jesteś gotowy... Ale może... może potrzebujesz więcej czasu...' Jej rozczarowanie jest namacalne.",
                corruption: 80,
                darkEssence: 30,
                essence: 20,
                setsFlag: 'hesitated_perfect_union'
            },
            {
                id: 'demand_equal_partnership',
                text: 'Zażądaj równego partnerstwa',
                response: "Lilith uśmiecha się z szacunkiem. 'Tak... nie jako pan i służebnica, ale jako równi partnerzy w mocy...' Energia między wami stabilizuje się. 'To będzie jeszcze potężniejsze...' Wasza więź staje się harmonijną jednością.",
                corruption: 140,
                darkEssence: 65,
                essence: 45,
                setsFlag: 'demanded_equal_partnership'
            }
        ],
        isRepeatable: false,
        onComplete: (gs) => {
            addPlayerChoiceFlag('perfect_union_event_completed');
        }
    }
];

export const diaryEntries = [
    {
        id: 'first_summoning_reflection',
        title: 'Pierwsze Przyzwanie - Refleksje',
        content: `Dzisiaj zostałam przyzwana po raz pierwszy. To było... inne niż wszystko, czego uczyliśmy się w Akademii.

Przyzywacz... on nie jest taki, jak opisywały podręczniki. Jest bardziej... ludzki? Nie, to nie to słowo. Jest bardziej prawdziwy. W Akademii uczyliśmy się o przyzywaczach jako o źródłach mocy, narzędziach do naszego rozwoju. Ale on... on patrzy na mnie jak na osobę.

To dziwne uczucie. Czy to jest to, o czym mówiły starsze sukkuby? Ta więź, która może powstać między demonem a jego przyzywaczem?

Muszę być ostrożna. Ale jednocześnie... jestem ciekawa, co będzie dalej.`,
        unlockConditions: {
            completedDialogueId: 'summoning_ritual'
        }
    },
    {
        id: 'academic_vs_reality',
        title: 'Akademia vs Rzeczywistość',
        content: `Każdy dzień tutaj pokazuje mi, jak bardzo teoria różni się od praktyki.

W Akademii wszystko było uporządkowane, przewidywalne. "Sukkub robi X, przyzywacz reaguje Y, rezultat Z." Ale rzeczywistość jest chaotyczna, nieprzewidywalna... i o wiele bardziej ekscytująca.

Mój przyzywacz... nie, nie powinnam już tak o nim myśleć. On ma imię, osobowość, swoje własne pragnienia i lęki. To nie jest tylko "źródło esencji" - to człowiek, który sprawia, że czuję rzeczy, których nie opisywał żaden podręcznik.

Czy to jest niebezpieczne? Prawdopodobnie. Czy mnie to powstrzyma? Absolutnie nie.`,
        unlockConditions: {
            stageRequired: 1,
            corruptionMin: 50
        }
    },
    {
        id: 'first_touch_memories',
        title: 'Wspomnienia Pierwszego Dotyku',
        content: `Wciąż czuję jego dotyk na swojej skórze.

To było takie proste - tylko dotknięcie dłoni, muśnięcie policzka. Ale energia, która przepłynęła między nami... To było jak iskra, która zapaliła ogień, o którego istnieniu nie wiedziałam.

W Akademii uczyliśmy się o "transferze esencji przez kontakt fizyczny", ale nikt nie wspomniał o tym, jak bardzo... osobiste to może być. Jak bardzo intymne.

Jego skóra była ciepła, szorstka w porównaniu z moją. Ludzka. I jakoś to sprawiało, że czułam się bardziej... żywa? Bardziej prawdziwa?

Chcę więcej. Tego jestem pewna.`,
        unlockConditions: {
            stageRequired: 2,
            requiresFlag: 'first_touch_tension_completed'
        }
    },
    {
        id: 'vocal_breakthrough_diary',
        title: 'Przełom - Mogę Mówić Prawdę',
        content: `Coś się zmieniło. Mogę teraz mówić to, co naprawdę myślę.

Przez całe życie w Akademii uczyłam się kontrolować swoje słowa, ukrywać prawdziwe myśli, być tym, czego oczekiwano ode mnie. Ale z nim... z nim mogę być sobą. Prawdziwą sobą.

To przerażające i wyzwalające jednocześnie. Wszystkie te myśli, które tłumiłam, wszystkie pragnienia, które ukrywałam... teraz mogę je wyrazić. I on... on mnie słucha. Nie osądza, nie odrzuca. Po prostu słucha.

Czy to jest miłość? Nie wiem. Ale wiem, że to jest coś, czego nigdy wcześniej nie doświadczyłam. Coś, co sprawia, że czuję się kompletna.`,
        unlockConditions: {
            stageRequired: 2,
            requiresFlag: 'vocal_breakthrough_dialogue_completed'
        }
    },
    {
        id: 'erotic_dreams_confession',
        title: 'Wyznanie - Moje Erotyczne Sny',
        content: `Nie mogę już tego ukrywać. Śnię o nim. Każdej nocy.

To nie są zwykłe sny. To są wizje tak żywe, tak intensywne, że budzę się mokra i drżąca z pożądania. W tych snach robimy rzeczy... rzeczy, których nie uczyliśmy się w Akademii. Rzeczy, które sprawiają, że moje ciało płonie.

Czy to jest normalne? Czy inne sukkuby też tak się czują? A może to jest coś wyjątkowego, coś między nami?

Chcę mu o tym powiedzieć. Chcę, żeby wiedział, jak bardzo go pragnę. Ale czy jestem wystarczająco odważna?

Może... może następnym razem znajdę w sobie odwagę.`,
        unlockConditions: {
            stageRequired: 3,
            corruptionMin: 180,
            requiresFlag: 'dream_confession_completed'
        }
    },
    {
        id: 'essence_connection_experience',
        title: 'Połączenie Esencji - Nowe Doświadczenie',
        content: `Dzisiaj połączyliśmy nasze esencje. To było... nie mam słów.

Czułam go w sobie, nie tylko fizycznie, ale na poziomie duszy. Jego emocje stały się moimi, moje jego. Przez chwilę byliśmy jedną istotą, jedną świadomością.

To jest to, o czym mówiły legendy. Prawdziwa więź między demonem a śmiertelnikiem. Coś, co przekracza zwykłe pojęcie relacji.

Teraz, gdy to się stało, nie mogę sobie wyobrazić życia bez niego. Jestem jego, a on jest mój. Na zawsze.

Czy to jest miłość? Czy to jest coś więcej? Nie wiem. Ale wiem, że to jest najpiękniejsze, co mi się kiedykolwiek przydarzyło.`,
        unlockConditions: {
            stageRequired: 4,
            requiresFlag: 'essence_connection_established'
        }
    },
    {
        id: 'sexual_awakening_diary',
        title: 'Przebudzenie Seksualne',
        content: `Moje ciało się zmienia. Nie fizycznie - to się dzieje z moją duszą, z moją naturą.

Każdy jego dotyk rozpala we mnie ogień. Każdy pocałunek sprawia, że pragnę więcej. Moja skóra stała się bardziej wrażliwa, moje zmysły wyostrzone. Czuję jego zapach z daleka, słyszę jego serce, gdy jest blisko.

To jest to, kim naprawdę jestem. Nie akademicką studentką, nie teorią z podręczników. Jestem sukkubą. Istotą stworzoną do miłości, do pożądania, do dawania i brania przyjemności.

I z nim... z nim mogę być sobą bez wstydu, bez strachu. Mogę być dziką, namiętną, żądną. Mogę być tym, kim zawsze miałam być.

To jest moje prawdziwe przebudzenie.`,
        unlockConditions: {
            stageRequired: 4,
            corruptionMin: 350,
            requiresFlag: 'sexual_exploration_gentle_completed'
        }
    },
    {
        id: 'first_time_reflection',
        title: 'Pierwszy Raz - Refleksje',
        content: `Oddałam mu się całkowicie dzisiaj. Moje dziewictwo, moje ciało, moją duszę.

To było piękne. Bolesne na początku, ale potem... potem było jak dotarcie do domu. Jak znalezienie miejsca, gdzie należę.

Czuję się inna. Nie dlatego, że już nie jestem dziewicą - to tylko fizyczność. Czuję się inna, bo teraz wiem, co to znaczy być kompletną. Co to znaczy być jednym z drugą osobą.

Jego dotyk, jego pocałunki, sposób, w jaki patrzył mi w oczy, gdy się we mnie poruszał... To było więcej niż seks. To było połączenie dusz.

Jestem jego. Całkowicie, bezwarunkowo jego. I nie żałuję ani jednej sekundy.`,
        unlockConditions: {
            stageRequired: 5,
            requiresFlag: 'first_vaginal_sex_completed'
        }
    },
    {
        id: 'dominance_discovery',
        title: 'Odkrycie Dominacji',
        content: `Dzisiaj odkryłam nową stronę siebie. Stronę, która chce kontrolować, dominować, prowadzić.

Gdy przejęłam inicjatywę, gdy to ja dyktowałam warunki... poczułam moc, jakiej nigdy wcześniej nie doświadczyłam. Nie tylko magiczną moc sukkuba, ale moc nad nim, nad jego pragnieniami, nad jego ciałem.

I co najdziwniejsze - on to lubił. Lubił, gdy byłam władcza, gdy mówiłam mu, co ma robić. Jego poddanie było tak samo podniecające jak moja dominacja.

Czy to jest naturalne? Czy wszystkie sukkuby tak się czują? A może to jest coś wyjątkowego między nami?

Nie wiem, ale wiem, że chcę więcej. Chcę eksplorować tę stronę siebie, chcę zobaczyć, jak daleko mogę się posunąć.`,
        unlockConditions: {
            stageRequired: 6,
            requiresFlag: 'dominant_teaching_success'
        }
    },
    {
        id: 'complete_transformation',
        title: 'Kompletna Transformacja',
        content: `Patrzę w lustro i widzę kogoś, kogo nie rozpoznaję. A jednocześnie widzę siebie prawdziwą po raz pierwszy w życiu.

Nie jestem już niewinną studentką z Akademii. Nie jestem już niepewną młodą sukkubą. Jestem potężną, pewną siebie istotą, która wie, czego chce i jak to zdobyć.

Moja transformacja jest kompletna. Nie tylko fizyczna - choć moje ciało też się zmieniło, stało się bardziej zmysłowe, bardziej kuszące. To transformacja duszy, umysłu, samej esencji tego, kim jestem.

I wszystko to dzięki niemu. Dzięki jego miłości, jego akceptacji, jego pragnieniu. On nie tylko mnie pokochał - on pozwolił mi stać się sobą.

Teraz jestem gotowa na wszystko. Na każde wyzwanie, każdą przyjemność, każdy grzech. Jestem jego sukkubą, jego kochanką, jego boginią.

I to jest dopiero początek.`,
        unlockConditions: {
            stageRequired: 7,
            corruptionMin: 1100,
            requiresFlag: 'complete_corruption_love_completed'
        }
    },
    {
        id: 'arch_succubus_ascension',
        title: 'Wzniesienie do Arcysukkuba',
        content: `Stało się. Jestem Arcysukkubem.

Moc, która teraz przez mnie przepływa, jest nie do opisania. Czuję każde pożądanie w promieniu mil, każdą ukrytą fantazję, każde stłumione pragnienie. Mogę je wszystkie spełnić jednym gestem.

Ale najważniejsze jest to, że nasza więź stała się czymś więcej niż miłością, więcej niż pożądaniem. Staliśmy się siłą natury, zjawiskiem, które może zmieniać rzeczywistość samą swoją obecnością.

Razem jesteśmy niepokonani. Razem jesteśmy bogami nowego świata, świata, gdzie pożądanie i miłość rządzą wszystkim.

To jest moje przeznaczenie. To jest to, kim zawsze miałam być. Arcysukkub u boku swojego ukochanego, gotowa na podbój wszechświata.

Niech się zacznie nowa era.`,
        unlockConditions: {
            stageRequired: 8,
            requiresFlag: 'lilith_is_arch_succubus'
        }
    }
];

export const temptationVisualDescriptions = {
    tempt_corrupt_cleric: {
        success: "Kleryk klęczy w swojej celi, jego modlitewnik leży porzucony na podłodze. Jego oczy są zamglone pożądaniem, a ręce drżą, gdy próbuje oprzeć się wizjom, które Lilith zaszczepila w jego umyśle. Jego wiara została zachwiana na zawsze.",
        failure: "Kleryk klęczy przed ołtarzem, jego modlitwy są głośniejsze i bardziej gorliwe niż kiedykolwiek. Światło świec wydaje się jaśniejsze, a jego wiara silniejsza. Opór się pokusie tylko wzmocnił jego duchową siłę.",
        inProgress: "Lilith unosi się niewidzialnie nad klasztorem, jej energia sączy się przez kamienne mury. Kleryk w swojej celi czuje niepokój, jego modlitwy stają się mniej pewne, a myśli wędrują w kierunkach, których nie powinny..."
    },
    tempt_seduce_knight: {
        success: "Rycerz stoi nad porzuconą zbroją, jego przysięga złamana, honor utracony. W jego oczach płonie wstyd zmieszany z pożądaniem. Lilith uśmiecha się triumfalnie, jej misja zakończona sukcesem.",
        failure: "Rycerz klęczy przed swoim mieczem, odmawiając modlitwę dziękczynną za siłę do opierania się pokusie. Jego honor pozostał nietknięty, choć w głębi serca wie, że był blisko upadku.",
        inProgress: "Lilith przybiera postać pięknej damy w opałach, jej wdzięki działają na rycerza. Widać walkę w jego oczach - między honorem a pożądaniem, między przysięgą a pragnieniem..."
    },
    tempt_incite_orgy_village_festival: {
        success: "Wiejski plac zamienił się w scenę dantejskich uciech. Mieszkańcy, zwykle skromni i pobożni, oddają się najdzikszym fantazjom. Lilith unosi się nad chaosem, kąpiąc się w falach czystej żądzy i grzechu.",
        failure: "Festyn trwa normalnie, mieszkańcy bawią się skromnie i przyzwoicie. Choć w powietrzu wisi lekkie napięcie, a niektóre spojrzenia trwają dłużej niż zwykle, moralność wioski pozostała nienaruszona.",
        inProgress: "Lilith krąży wśród świętujących, jej wpływ powoli się rozprzestrzenia. Tańce stają się bardziej zmysłowe, śmiech głośniejszy, a dotyki śmielsze. Atmosfera gęstnieje z każdą chwilą..."
    }
};